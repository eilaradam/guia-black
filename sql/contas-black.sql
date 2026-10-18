-- Contas da apostila da Black: cadastro, login e dados da aluna em qualquer aparelho.
-- Tudo isolado: nao usa auth.users (as contas do creators/agencia nao se misturam).
-- O navegador so fala com as funcoes abaixo; as tabelas ficam fechadas (RLS sem policy).
create extension if not exists pgcrypto with schema extensions;

create table if not exists black_contas (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  nome text not null,
  arroba text not null,
  whatsapp text not null,
  senha_hash text not null,
  criado_em timestamptz not null default now(),
  ultimo_login timestamptz
);
create table if not exists black_sessoes (
  token_hash text primary key,
  conta_id uuid not null references black_contas(id) on delete cascade,
  criado_em timestamptz not null default now()
);
create table if not exists black_dados (
  conta_id uuid primary key references black_contas(id) on delete cascade,
  dados jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);
create table if not exists black_falhas (
  email text not null,
  quando timestamptz not null default now()
);
create index if not exists black_falhas_email on black_falhas(email, quando);
alter table black_contas enable row level security;
alter table black_sessoes enable row level security;
alter table black_dados enable row level security;
alter table black_falhas enable row level security;

create or replace function _black_nova_sessao(p_conta uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare t text := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
begin
  insert into black_sessoes(token_hash, conta_id) values (encode(digest(t, 'sha256'), 'hex'), p_conta);
  return t;
end $$;

create or replace function _black_conta_do_token(p_token text) returns uuid
language sql security definer set search_path = public, extensions stable as $$
  select conta_id from black_sessoes where token_hash = encode(digest(coalesce(p_token,''), 'sha256'), 'hex')
$$;

create or replace function _black_perfil(p_conta uuid) returns jsonb
language sql security definer set search_path = public as $$
  select jsonb_build_object('nome', c.nome, 'email', c.email, 'arroba', c.arroba, 'whatsapp', c.whatsapp,
                            'dados', coalesce(d.dados, '{}'::jsonb), 'atualizado', d.atualizado_em)
  from black_contas c left join black_dados d on d.conta_id = c.id where c.id = p_conta
$$;

create or replace function black_cadastrar(p_nome text, p_email text, p_arroba text, p_whatsapp text, p_senha text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare e text := lower(trim(p_email)); id uuid;
begin
  if length(trim(p_nome)) < 2 or length(trim(p_arroba)) < 2 or length(regexp_replace(p_whatsapp,'\D','','g')) < 10
     or e !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    return jsonb_build_object('ok', false, 'erro', 'dados');
  end if;
  if length(coalesce(p_senha,'')) < 6 or length(p_senha) > 72 then
    return jsonb_build_object('ok', false, 'erro', 'senha');
  end if;
  if exists (select 1 from black_contas where email = e) then
    return jsonb_build_object('ok', false, 'erro', 'existe');
  end if;
  insert into black_contas(email, nome, arroba, whatsapp, senha_hash)
  values (e, left(trim(p_nome),120), left(lower(regexp_replace(p_arroba,'^@+|[^a-zA-Z0-9._]','','g')),60),
          regexp_replace(p_whatsapp,'\D','','g'), crypt(p_senha, gen_salt('bf')))
  returning black_contas.id into id;
  return jsonb_build_object('ok', true, 'token', _black_nova_sessao(id)) || _black_perfil(id);
end $$;

create or replace function black_entrar(p_email text, p_senha text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare e text := lower(trim(p_email)); c black_contas;
begin
  delete from black_falhas where quando < now() - interval '1 hour';
  if (select count(*) from black_falhas where email = e and quando > now() - interval '15 minutes') >= 6 then
    return jsonb_build_object('ok', false, 'erro', 'muitas');
  end if;
  select * into c from black_contas where email = e;
  if not found or c.senha_hash <> crypt(coalesce(p_senha,''), c.senha_hash) then
    insert into black_falhas(email) values (e);
    return jsonb_build_object('ok', false, 'erro', 'login');
  end if;
  delete from black_falhas where email = e;
  update black_contas set ultimo_login = now() where id = c.id;
  return jsonb_build_object('ok', true, 'token', _black_nova_sessao(c.id)) || _black_perfil(c.id);
end $$;

create or replace function black_carregar(p_token text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare id uuid := _black_conta_do_token(p_token);
begin
  if id is null then return jsonb_build_object('ok', false, 'erro', 'sessao'); end if;
  return jsonb_build_object('ok', true) || _black_perfil(id);
end $$;

create or replace function black_salvar_dados(p_token text, p_dados jsonb)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare id uuid := _black_conta_do_token(p_token);
begin
  if id is null then return jsonb_build_object('ok', false, 'erro', 'sessao'); end if;
  if length(p_dados::text) > 400000 then return jsonb_build_object('ok', false, 'erro', 'grande'); end if;
  insert into black_dados(conta_id, dados, atualizado_em) values (id, p_dados, now())
  on conflict (conta_id) do update set dados = excluded.dados, atualizado_em = now();
  return jsonb_build_object('ok', true, 'atualizado', (select atualizado_em from black_dados where conta_id = id));
end $$;

create or replace function black_sair(p_token text) returns void
language sql security definer set search_path = public, extensions as $$
  delete from black_sessoes where token_hash = encode(digest(coalesce(p_token,''), 'sha256'), 'hex')
$$;

-- esqueci a senha: confere e-mail + WhatsApp do cadastro e define uma nova
create or replace function black_redefinir(p_email text, p_whatsapp text, p_nova text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare e text := lower(trim(p_email)); c black_contas;
begin
  if length(coalesce(p_nova,'')) < 6 or length(p_nova) > 72 then return jsonb_build_object('ok', false, 'erro', 'senha'); end if;
  if (select count(*) from black_falhas where email = e and quando > now() - interval '15 minutes') >= 6 then
    return jsonb_build_object('ok', false, 'erro', 'muitas');
  end if;
  select * into c from black_contas where email = e;
  if not found or c.whatsapp <> regexp_replace(coalesce(p_whatsapp,''),'\D','','g') then
    insert into black_falhas(email) values (e);
    return jsonb_build_object('ok', false, 'erro', 'dados');
  end if;
  update black_contas set senha_hash = crypt(p_nova, gen_salt('bf')) where id = c.id;
  delete from black_sessoes where conta_id = c.id;
  return jsonb_build_object('ok', true, 'token', _black_nova_sessao(c.id)) || _black_perfil(c.id);
end $$;

revoke all on function _black_nova_sessao(uuid), _black_conta_do_token(text), _black_perfil(uuid) from public, anon, authenticated;
revoke all on function black_cadastrar(text,text,text,text,text), black_entrar(text,text), black_carregar(text),
  black_salvar_dados(text,jsonb), black_sair(text), black_redefinir(text,text,text) from public;
grant execute on function black_cadastrar(text,text,text,text,text), black_entrar(text,text), black_carregar(text),
  black_salvar_dados(text,jsonb), black_sair(text), black_redefinir(text,text,text) to anon, authenticated;

-- painel da Lara: quem criou conta
create or replace function admin_black_contas()
returns table (nome text, email text, arroba text, whatsapp text, criado_em timestamptz, ultimo_login timestamptz)
language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'sem permissao'; end if;
  return query select c.nome, c.email, c.arroba, c.whatsapp, c.criado_em, c.ultimo_login from black_contas c order by c.criado_em desc;
end $$;
grant execute on function admin_black_contas() to authenticated;
revoke execute on function admin_black_contas() from anon, public;
notify pgrst, 'reload schema';
