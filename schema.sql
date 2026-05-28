-- Run this in Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → New Query → paste → Run

-- Remittance transactions table
create table if not exists remittances (
  id              bigint generated always as identity primary key,
  tx_hash         text unique not null,
  sender          text not null,
  receiver        text not null,
  amount          numeric not null,
  category        smallint not null,
  category_label  text not null,
  timestamp_chain bigint not null,
  created_at      timestamptz default now()
);

-- Index for fast receiver lookups
create index if not exists idx_remittances_receiver
  on remittances(receiver);

-- Index for sender lookups
create index if not exists idx_remittances_sender
  on remittances(sender);

-- Enable Row Level Security
alter table remittances enable row level security;

-- Allow anyone to read (public dashboard)
create policy "Public read"
  on remittances for select
  using (true);

-- Allow anyone to insert (frontend saves after on-chain confirmation)
create policy "Public insert"
  on remittances for insert
  with check (true);
