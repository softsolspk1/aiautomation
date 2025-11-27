# Vercel Environment Variables Configuration
# Copy these to: Vercel Dashboard → Your Project → Settings → Environment Variables

## Database (Supabase) - REQUIRED
NEXT_PUBLIC_SUPABASE_URL=https://gojkwufkuzeirzplcdix.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvamt3dWZrdXplaXJ6cGxjZGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjgwMjIsImV4cCI6MjA3OTgwNDAyMn0.dbraV5r4Q8oxzp9eb5fyisr1cQOosW7SrMd-ocVau2M

## Authentication - REQUIRED
NEXTAUTH_SECRET=softsols_ai_automation_secret_key_2024_production_32chars
NEXTAUTH_URL=https://aiautomation-jade.vercel.app

## AI Models - OPTIONAL (add when you have API keys)
# OPENAI_API_KEY=sk-your_key_here
# GOOGLE_AI_API_KEY=your_key_here
# ANTHROPIC_API_KEY=your_key_here

---

## Quick Setup Instructions:

1. Go to: https://vercel.com/dashboard
2. Select your project: aiautomation-jade
3. Click: Settings → Environment Variables
4. Add each variable above (one at a time):
   - Name: NEXT_PUBLIC_SUPABASE_URL
   - Value: https://gojkwufkuzeirzplcdix.supabase.co
   - Environment: Production, Preview, Development (select all)
   - Click "Save"
   
5. Repeat for all variables

6. After adding all variables, go to Deployments tab
7. Click "..." on latest deployment → "Redeploy"

---

## Alternative: Use Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://gojkwufkuzeirzplcdix.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add NEXTAUTH_SECRET production
# Paste: softsols_ai_automation_secret_key_2024_production_32chars

vercel env add NEXTAUTH_URL production
# Paste: https://aiautomation-jade.vercel.app

# Redeploy
vercel --prod
```
