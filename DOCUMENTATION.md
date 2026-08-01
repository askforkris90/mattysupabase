# Matty Social Triple Stack Documentation

## 📋 Overview

Matty Social is a modern creator platform built with a **triple stack architecture**:

- **Backend:** Ruby on Rails 7 + Supabase
- **Frontend:** HTML + Vanilla JavaScript
- **Hosting:** GitHub Pages + matxsupa.pro custom domain
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth

---

## 🏗️ Architecture

### Stack Composition
```
HTML (54.7%)  ├─ Login Page
              ├─ Dashboard Page  
              └─ Artist Profile Template

JavaScript (1% + enhanced)
              ├─ auth.js - Supabase authentication
              ├─ dashboard.js - Profile management
              └─ Supabase real-time sync

Ruby on Rails (New Backend)
              ├─ API Controllers
              │  ├─ auth_controller.rb
              │  └─ profiles_controller.rb
              ├─ Page Routing
              └─ Asset Pipeline

CSS (44.3%)   └─ Matty Design System (Neon Dark Theme)
```

### Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5 + Vanilla JS | Lightweight, no framework overhead |
| Styling | CSS3 + Gradients | Modern dark neon theme |
| Backend | Ruby on Rails 7 | REST API & Page Rendering |
| Database | Supabase PostgreSQL | User profiles & data storage |
| Auth | Supabase Auth | Email/password authentication |
| Storage | Supabase Storage | Avatar image hosting |
| Hosting | GitHub Pages | Static & Rails assets |
| Domain | matxsupa.pro | Custom domain routing |

---

## 📁 Project Structure

```
mattysupabase/
├── app/
│   ├── controllers/
│   │   ├── pages_controller.rb          # Page routing
│   │   └── api/
│   │       ├── auth_controller.rb       # Sign in/up/out
│   │       └── profiles_controller.rb   # Profile CRUD
│   ├── views/
│   │   ├── layouts/
│   │   │   └── application.html.erb     # Main layout
│   │   └── pages/
│   │       ├── index.html.erb           # Login page
│   │       └── dashboard.html.erb       # Dashboard
│   ├── javascript/
│   │   ├── auth.js                      # Auth logic
│   │   └── dashboard.js                 # Dashboard logic
│   └── assets/stylesheets/
│       ├── application.css              # Manifest
│       └── matty.css                    # Design system
├── config/
│   ├── routes.rb                        # Route definitions
│   └── environment.rb
├── .github/workflows/
│   └── pages-deploy.yml                 # Auto-deploy workflow
├── .env.example                         # Environment template
├── CNAME                                # matxsupa.pro domain
├── Gemfile                              # Ruby dependencies
└── README.md                            # Project docs
```

---

## 🚀 Getting Started

### Prerequisites
```bash
Ruby 3.2.0
PostgreSQL 12+
Node.js 14+
Supabase account
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/askforkris90/mattysupabase.git
   cd mattysupabase
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Setup database:**
   ```bash
   rails db:create
   rails db:migrate
   ```

5. **Start development server:**
   ```bash
   rails s
   ```
   Open http://localhost:3000

---

## 🔐 Supabase Configuration

### 1. Create Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  handle TEXT UNIQUE,
  bio TEXT,
  main_link TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 2. Enable Row Level Security (RLS)

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view all profiles
CREATE POLICY "Profiles are public" ON profiles
  FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 3. Create Storage Bucket

```bash
# In Supabase Console:
1. Go to Storage → Buckets
2. Create new bucket: "avatars"
3. Set to Public
4. Add policies for authenticated users
```

### 4. Environment Variables

```env
# .env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-public-anon-key
RAILS_ENV=production
SECRET_KEY_BASE=your-generated-secret
DOMAIN=matxsupa.pro
```

---

## 🌐 Routing

### Public Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/` | GET | Login page |
| `/dashboard` | GET | User dashboard |
| `/artist/:id` | GET | Artist profile |

### API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/sign_in` | POST | Authenticate user |
| `/api/auth/sign_up` | POST | Create new account |
| `/api/auth/sign_out` | POST | Logout user |
| `/api/profiles/:user_id` | GET | Fetch user profile |
| `/api/profiles/:user_id` | PATCH/PUT | Update user profile |

---

## 🎨 Design System

### Color Palette

```css
--bg: #02030d              /* Deep dark background */
--bg-card: #05071a         /* Card background */
--accent: #5b8dff          /* Primary blue */
--accent-pink: #ff4fbc     /* Secondary pink */
--text-main: #f5f7ff       /* Primary text */
--text-muted: #a4a9c8      /* Secondary text */
--danger: #ff4f6a          /* Error color */
```

### Components

- **Buttons:** Primary (gradient), Secondary (outlined)
- **Inputs:** Icon-prefixed with focus states
- **Cards:** Glassmorphism with gradient borders
- **Avatar:** Circular gradient ring with fallback
- **Pills:** Status indicators and badges

---

## 📱 Responsive Design

Optimized for all screen sizes with mobile-first approach:

```css
/* Breakpoints */
Mobile: < 480px    (100% width, adjusted padding)
Tablet: 480px+     (optimized spacing)
Desktop: 1024px+   (full layout)
```

---

## 🔄 Authentication Flow

### Sign In
```
1. User enters email/password on login page
2. Frontend calls Supabase auth.signInWithPassword()
3. Backend receives session token
4. User redirected to /dashboard
5. Dashboard loads user profile from Supabase
```

### Sign Up
```
1. User navigates to signup page
2. Provides email and password
3. Frontend calls Supabase auth.signUp()
4. Confirmation email sent (if enabled)
5. User redirected to login page
```

### Profile Management
```
1. User fills profile form (name, bio, link, avatar)
2. Avatar uploaded to Supabase Storage
3. Profile data upserted to Supabase
4. Changes reflected immediately on dashboard
5. Can be viewed on public artist page
```

---

## 🚢 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Custom domain: matxsupa.pro

2. **Automatic Deployment:**
   ```yaml
   # .github/workflows/pages-deploy.yml
   # Triggered on push to main
   # Builds Rails assets
   # Deploys to GitHub Pages
   ```

3. **Domain Configuration:**
   - Add CNAME file with `matxsupa.pro`
   - Point DNS A records to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

### Production Environment

```bash
# Build assets
bundle exec rake assets:precompile

# Set production secrets
RAILS_MASTER_KEY=your-key
SECRET_KEY_BASE=your-secret

# Deploy
git push origin main
# GitHub Actions automatically deploys to matxsupa.pro
```

---

## 📊 Database Schema

### Profiles Table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key (auth.users id) |
| display_name | TEXT | User's display name |
| handle | TEXT | Unique username |
| bio | TEXT | User biography |
| main_link | TEXT | External link (for QR) |
| avatar_url | TEXT | Supabase Storage URL |
| email | TEXT | User email |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last profile update |

---

## 🔧 Development

### File Modifications

**Edit auth logic:**
```bash
app/javascript/auth.js
```

**Edit dashboard logic:**
```bash
app/javascript/dashboard.js
```

**Edit styles:**
```bash
app/assets/stylesheets/matty.css
```

**Edit API endpoints:**
```bash
app/controllers/api/
```

### Testing

```bash
# Run Rails tests
bundle exec rails test

# Run specific test
bundle exec rails test test/controllers/api/auth_controller_test.rb
```

### Asset Pipeline

```bash
# Precompile assets
bundle exec rake assets:precompile

# Clean assets
bundle exec rake assets:clobber
```

---

## 🐛 Troubleshooting

### Issue: "SUPABASE_URL not found"
**Solution:** Ensure `.env` file exists and is loaded
```bash
cp .env.example .env
# Add your Supabase credentials
```

### Issue: "Profile not found" errors
**Solution:** Verify Supabase table structure and RLS policies
```sql
SELECT * FROM profiles LIMIT 1;
```

### Issue: Avatar upload fails
**Solution:** Check Supabase Storage bucket permissions and CORS settings

### Issue: GitHub Pages not deploying
**Solution:** Check GitHub Actions workflow logs and verify GITHUB_TOKEN permissions

---

## 📝 Contributing

1. Create a feature branch from `main`
2. Make changes and test locally
3. Create a Pull Request with description
4. Request review
5. Merge to main (triggers auto-deploy)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Support

**Issues & Questions:**
- GitHub Issues: https://github.com/askforkris90/mattysupabase/issues
- Email: contact@matxsupa.pro

**Links:**
- **Site:** https://matxsupa.pro
- **Domain:** matxsupa.pro
- **Repository:** https://github.com/askforkris90/mattysupabase

---

## 🎯 Roadmap

- [ ] Artist QR code generation
- [ ] Social features (follows, likes)
- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Monetization features

---

**Built with ❤️ by Zkris for Matty Social**

**Signed: Xpro** ✍️
