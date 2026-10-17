-- =====================================================================
-- Progresso das alunas na apostila da IMERSAO DE BLACK (18/10/2026)
-- Projeto: Cadastro de Creators (mfrmnquvwwuxraqgemyh)
--
-- 100% ADITIVO: cria 1 tabela nova e 2 funções novas. Não altera nada
-- da imersao_progresso nem da imersao_progresso_d2 (Turma 2).
-- =====================================================================

create table if not exists public.black_progresso (
  id        bigserial primary key,
  arroba    text not null unique,
  nome      text,
  email     text,
  whatsapp  text,
  etapa     text,
  feitos    jsonb not null default '[]'::jsonb,
  marcados  int  not null default 0,
  total     int  not null default 0,
  criado_em timestamptz not null default now(),
  visto_em  timestamptz not null default now()
);

alter table public.black_progresso enable row level security;

drop policy if exists black_progresso_admin on public.black_progresso;
create policy black_progresso_admin on public.black_progresso
  for all to authenticated using (is_admin()) with check (is_admin());

-- A porta de entrada da aluna: só essa função escreve, e só a linha dela.
create or replace function public.black_salvar_progresso(
  p_arroba text, p_nome text, p_email text, p_whatsapp text,
  p_etapa text, p_feitos jsonb, p_marcados int, p_total int
) returns void language plpgsql security definer set search_path = public as $fn$
declare a text; n text; e text; w text;
begin
  a := lower(regexp_replace(coalesce(p_arroba,''), '[^a-zA-Z0-9._]', '', 'g'));
  if a = '' or length(a) > 40 then return; end if;
  n := nullif(trim(coalesce(p_nome,'')),'');
  e := lower(nullif(trim(coalesce(p_email,'')),''));
  w := nullif(regexp_replace(coalesce(p_whatsapp,''), '[^0-9]', '', 'g'),'');
  insert into black_progresso (arroba, nome, email, whatsapp, etapa, feitos, marcados, total)
  values (a, left(n,80), left(e,120), left(w,20), left(coalesce(p_etapa,''),8),
          coalesce(p_feitos,'[]'::jsonb), coalesce(p_marcados,0), coalesce(p_total,0))
  on conflict (arroba) do update set
    nome     = coalesce(excluded.nome,     black_progresso.nome),
    email    = coalesce(excluded.email,    black_progresso.email),
    whatsapp = coalesce(excluded.whatsapp, black_progresso.whatsapp),
    etapa    = excluded.etapa,
    feitos   = excluded.feitos,
    marcados = excluded.marcados,
    total    = excluded.total,
    visto_em = now();
end $fn$;

revoke all on function public.black_salvar_progresso(text,text,text,text,text,jsonb,int,int) from public;
grant execute on function public.black_salvar_progresso(text,text,text,text,text,jsonb,int,int) to anon, authenticated;

-- A leitura da Lara.
create or replace function public.admin_black_progresso()
returns setof black_progresso language sql security definer set search_path = public as $fn$
  select * from public.black_progresso where is_admin() order by visto_em desc;
$fn$;

revoke all on function public.admin_black_progresso() from public;
grant execute on function public.admin_black_progresso() to authenticated;
