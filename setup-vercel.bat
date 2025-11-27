@echo off
echo ========================================
echo Vercel Environment Variables Setup
echo ========================================
echo.

echo This script will configure environment variables for your Vercel project.
echo.
echo Prerequisites:
echo - Vercel CLI installed (npm i -g vercel)
echo - Logged in to Vercel (vercel login)
echo.
pause

echo.
echo Step 1: Linking to Vercel project...
call vercel link

echo.
echo Step 2: Adding NEXT_PUBLIC_SUPABASE_URL...
echo https://gojkwufkuzeirzplcdix.supabase.co | vercel env add NEXT_PUBLIC_SUPABASE_URL production

echo.
echo Step 3: Adding NEXT_PUBLIC_SUPABASE_ANON_KEY...
echo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvamt3dWZrdXplaXJ6cGxjZGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjgwMjIsImV4cCI6MjA3OTgwNDAyMn0.dbraV5r4Q8oxzp9eb5fyisr1cQOosW7SrMd-ocVau2M | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

echo.
echo Step 4: Adding NEXTAUTH_SECRET...
echo softsols_ai_automation_secret_key_2024_production_32chars | vercel env add NEXTAUTH_SECRET production

echo.
echo Step 5: Adding NEXTAUTH_URL...
echo https://aiautomation-jade.vercel.app | vercel env add NEXTAUTH_URL production

echo.
echo ========================================
echo Environment variables configured!
echo ========================================
echo.
echo Next steps:
echo 1. Add AI API keys manually when you have them
echo 2. Redeploy: vercel --prod
echo.
pause
