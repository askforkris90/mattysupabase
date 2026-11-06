
// supabase-init.js
// Public Supabase project connection for the artist site.

const { createClient } = window.supabase;

export const supabaseClient = createClient(
  "https://jgavjllnhqiftgbfmhuy.supabase.co",
  "sb_publishable_Rvj-ZVP1guopBTfYg9hS0Q_npx1JwP3"
);

