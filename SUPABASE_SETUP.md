# Supabase Database Setup Instructions

## Step 1: Run Database Schema

1. Go to your Supabase project: https://supabase.com/dashboard/project/gojkwufkuzeirzplcdix

2. Click on **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy and paste the contents of `src/lib/db/schema.sql`

5. Click **Run** to execute the SQL

## Step 2: Verify Tables Created

1. Go to **Table Editor** in the left sidebar

2. You should see these tables:
   - users
   - bots
   - bot_executions
   - documents
   - knowledge_items
   - workflows

## Step 3: Set Up Environment Variables Locally

Run the setup script:
```bash
setup-env.bat
```

This will create `.env.local` with your Supabase credentials.

## Step 4: Add AI API Keys

Edit `.env.local` and add your API keys:

- **OpenAI**: Get from https://platform.openai.com/api-keys
- **Google Gemini**: Get from https://makersuite.google.com/app/apikey  
- **Anthropic**: Get from https://console.anthropic.com/

## Step 5: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000

## Step 6: Configure Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` (when you have it)
   - `GOOGLE_AI_API_KEY` (when you have it)
   - `ANTHROPIC_API_KEY` (when you have it)
   - `NEXTAUTH_SECRET` (generate a random 32+ character string)
   - `NEXTAUTH_URL` (set to your production URL)

5. Redeploy your application

## Database Connection String

If needed, your connection string format is:
```
postgresql://postgres:[YOUR-PASSWORD]@db.gojkwufkuzeirzplcdix.supabase.co:5432/postgres
```

Password: `8d+cP@5*?E_p8eZ`

## Security Notes

- ✅ `.env.local` is already in `.gitignore` (never commit it!)
- ✅ Use environment variables in Vercel for production
- ✅ The anon key is safe to expose (it has Row Level Security)
- ⚠️ Never expose your service_role key
- ⚠️ Keep your database password secure
