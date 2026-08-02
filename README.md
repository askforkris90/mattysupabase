# Matty Social – Ruby on Rails × Supabase × GitHub Pages

A modern creator platform built with a triple stack:
- **Backend:** Ruby on Rails
- **Frontend:** HTML + JavaScript (Vanilla)
- **Hosting:** GitHub Pages + matxsupa.pro domain
- **Auth:** Supabase Auth
- **Database:** Supabase PostgreSQL

## Setup

### Prerequisites
- Ruby 3.2+
- PostgreSQL
- Node.js (for assets)
- Supabase account

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/askforkris90/mattysupabase.git
   cd mattysupabase
   bundle install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Database setup:**
   ```bash
   rails db:create
   rails db:migrate
   ```

4. **Start the development server:**
   ```bash
   rails s
   ```

### Supabase Setup

1. Create a Supabase project
2. Create `profiles` table:
   ```sql
   CREATE TABLE profiles (
     id UUID PRIMARY KEY,
     display_name TEXT,
     handle TEXT,
     bio TEXT,
     main_link TEXT,
     avatar_url TEXT,
     email TEXT,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
   );
   ```

3. Enable Row Level Security (RLS)
4. Create storage bucket for avatars

## Pages

- `/` – Sign in
- `/dashboard` – User dashboard
- `/artist/:id` – Artist profile page

## Deployment

Deploy to GitHub Pages with automatic builds using the GitHub Actions workflow in `.github/workflows/pages-deploy.yml`.

Point `matxsupa.pro` DNS to GitHub Pages.

## License

MIT
