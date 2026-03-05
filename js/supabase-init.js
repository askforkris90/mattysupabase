
// supabase-init.js
// Fill in your Supabase URL + anon key from Settings -> API

const { createClient } = window.supabase;

export const supabaseClient = createClient(
  "https://YOUR_PROJECT_ID.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
);
