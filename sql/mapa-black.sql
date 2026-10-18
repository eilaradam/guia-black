-- =====================================================================
-- Mapa da Black: progresso do mapa (missões e placar) por aluna
-- Projeto: Cadastro de Creators (mfrmnquvwwuxraqgemyh)
-- 100% ADITIVO: 1 coluna nova em black_progresso + 1 função nova.
-- =====================================================================
alter table public.black_progresso add column if not exists mapa jsonb;

create or replace function public.black_salvar_mapa(p_arroba text, p_mapa jsonb)
returns void language plpgsql security definer set search_path = public as $fn$
declare a text;
begin
  a := lower(regexp_replace(coalesce(p_arroba,''), '[^a-zA-Z0-9._]', '', 'g'));
  if a = '' or length(a) > 40 then return; end if;
  if p_mapa is null or length(p_mapa::text) > 4000 then return; end if;
  update public.black_progresso set mapa = p_mapa, visto_em = now() where arroba = a;
end $fn$;

revoke all on function public.black_salvar_mapa(text, jsonb) from public;
grant execute on function public.black_salvar_mapa(text, jsonb) to anon, authenticated;
