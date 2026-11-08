-- Supabase SQL Editor-এ পুরো SQL চালান।
create table if not exists public.digital_users (
  id text primary key,
  name text not null,
  profile jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.digital_users enable row level security;

-- Browser থেকে সরাসরি table access বন্ধ। সব ডেটা Netlify Function দিয়ে যাবে।
revoke all on public.digital_users from anon, authenticated;
