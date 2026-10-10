create extension if not exists pgcrypto;

create table if not exists global_messages (
 id uuid primary key default gen_random_uuid(),
 guest_id uuid not null,
 display_name varchar(24) not null,
 contact_handle varchar(33),
 contact_platform varchar(10) not null default 'unknown' check (contact_platform in ('x','telegram','unknown')),
 content varchar(300) not null,
 role varchar(10) not null default 'guest' check (role in ('guest','admin')),
 created_at timestamptz not null default now()
);
create index if not exists global_messages_created_at_idx on global_messages(created_at desc,id desc);

create or replace function send_global_message(p_guest_id uuid,p_display_name varchar,p_contact_handle varchar,p_contact_platform varchar,p_content varchar,p_role varchar default 'guest')
returns global_messages language plpgsql as $$
declare created global_messages;
begin
 insert into global_messages(guest_id,display_name,contact_handle,contact_platform,content,role) values(p_guest_id,p_display_name,p_contact_handle,p_contact_platform,p_content,p_role) returning * into created;
 delete from global_messages where id in (select id from global_messages order by created_at desc,id desc offset 100);
 return created;
end; $$;
