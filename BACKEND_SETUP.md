# Backend Setup Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account (free tier available)
- AI API keys (OpenAI, Google, Anthropic)

## Step 1: Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Choose organization and project name
   - Set database password
   - Select region closest to you

2. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `src/lib/db/schema.sql`
   - Paste and run the SQL

3. **Get Connection Details**
   - Go to Project Settings → API
   - Copy `Project URL` and `anon public` key

## Step 2: Get AI API Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy the key (starts with `sk-`)

### Google Gemini
1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Copy the key

### Anthropic Claude
1. Go to https://console.anthropic.com/
2. Create API key
3. Copy the key

## Step 3: Environment Variables

Create `.env.local` file in project root:

```env
# Database (from Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# AI Models
OPENAI_API_KEY=sk-your_key
GOOGLE_AI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key

# Authentication
NEXTAUTH_SECRET=generate_random_32_char_string
NEXTAUTH_URL=http://localhost:3000
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000

## Step 6: Test Bot Execution

1. Go to `/bots/builder`
2. Create a new bot
3. Select a model (e.g., GPT-4)
4. Add system prompt
5. Save bot
6. Test execution via API:

```bash
curl -X POST http://localhost:3000/api/bots/{bot_id}/execute \
  -H "Content-Type: application/json" \
  -d '{"input": "Hello, how are you?"}'
```

## Step 7: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add backend integration"
   git push
   ```

2. **Configure Vercel**
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`

3. **Deploy**
   - Vercel will auto-deploy on push
   - Or manually trigger deployment

## Troubleshooting

### Database Connection Issues
- Verify Supabase URL and key are correct
- Check if tables were created (use Supabase Table Editor)
- Ensure project is not paused (free tier auto-pauses)

### AI API Errors
- Verify API keys are valid
- Check API quota/billing
- Ensure keys have correct permissions

### Build Errors
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are installed

## Cost Management

### Free Tiers
- **Supabase**: 500MB database, 2GB bandwidth/month
- **OpenAI**: Pay-as-you-go (no free tier)
- **Google Gemini**: 60 requests/minute free
- **Anthropic**: Pay-as-you-go

### Estimated Monthly Costs
- Database: $0 (free tier) or $25 (Pro)
- OpenAI API: $10-100 (depends on usage)
- Google Gemini: $0-20
- Anthropic: $10-50
- **Total**: $20-195/month

## Security Checklist
- [ ] Never commit `.env.local` to Git
- [ ] Use environment variables in Vercel
- [ ] Enable Row Level Security in Supabase
- [ ] Add API rate limiting
- [ ] Implement user authentication
- [ ] Validate all inputs
- [ ] Use HTTPS only

## Next Steps
- Implement authentication (NextAuth.js)
- Add rate limiting
- Set up monitoring
- Configure backups
- Add error tracking (Sentry)
