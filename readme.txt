
Matty Social · Supabase Neon Auth + Artist Card Pack (Schema A)
===============================================================

This pack replaces Firebase with Supabase and gives you:

- Supabase email/password login
- Signup
- Password reset
- Profiles table (Schema A)
- Avatar upload via Supabase Storage (bucket: avatars)
- Public artist card with QR
  - URL: artist.html?uid=USER_ID

Files
-----
index.html       -> Login (Supabase auth.signInWithPassword)
signup.html      -> Sign up, creates profile row in 'profiles'
forgot.html      -> Password reset via Supabase resetPasswordForEmail
dashboard.html   -> Creator dashboard (edit profile, upload avatar, main link)
artist.html      -> Public neon artist card using Supabase profiles table
css/matty.css    -> Dark neon style
js/supabase-init.js -> Creates Supabase client (you fill in URL + Anon key)

Supabase Setup
--------------
1. Create project at https://app.supabase.com
2. Go to Settings -> API
   - Copy "Project URL"
   - Copy "anon public" key
3. Put them into js/supabase-init.js:
   const supabaseClient = createClient("URL", "ANON_KEY");

Auth
----
- In Supabase dashboard:
  Auth -> Providers -> Email
  Enable Email/Password.

Database Schema (Schema A)
--------------------------
In SQL editor, create the 'profiles' table:

  create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    display_name text,
    handle text,
    bio text,
    avatar_url text,
    main_link text,
    links jsonb,
    email text,
    created_at timestamptz default now(),
    updated_at timestamptz
  );

Row Level Security
------------------
Enable RLS on 'profiles':

  alter table public.profiles enable row level security;

Policies:

1) Allow anyone to read profiles (public artist cards):

  create policy "Public read profiles"
  on public.profiles
  for select
  using ( true );

2) Allow users to insert/update their own row:

  create policy "Users manage own profile"
  on public.profiles
  for all
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

Storage (Avatar Uploads)
------------------------
1. Go to Storage -> Create new bucket:
   - Name: avatars
   - Public: ON

2. No extra policy needed for basic public avatars, but you can lock it down later.

Flow
----
- index.html: login
- signup.html: create account (auth) + upsert profiles row
- dashboard.html: loads current profile via auth.getSession() + select from profiles
- dashboard.html: on save, uploads avatar to Storage 'avatars', updates profiles row
- artist.html?uid=USER_ID: loads that profile from Supabase and renders neon card + QR

Netlify
-------
Deploy this folder as a static site:
- No build command.
- Just drag+drop or connect a repo that has these files at the root.
