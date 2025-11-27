@echo off
echo Creating .env.local file...

(
echo # Database (Supabase^)
echo NEXT_PUBLIC_SUPABASE_URL=https://gojkwufkuzeirzplcdix.supabase.co
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvamt3dWZrdXplaXJ6cGxjZGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjgwMjIsImV4cCI6MjA3OTgwNDAyMn0.dbraV5r4Q8oxzp9eb5fyisr1cQOosW7SrMd-ocVau2M
echo.
echo # AI Models (Add your API keys here^)
echo OPENAI_API_KEY=
echo GOOGLE_AI_API_KEY=
echo ANTHROPIC_API_KEY=
echo.
echo # Authentication
echo NEXTAUTH_SECRET=your_nextauth_secret_min_32_chars_change_this
echo NEXTAUTH_URL=http://localhost:3000
) > .env.local

echo .env.local file created successfully!
echo.
echo IMPORTANT: Add your AI API keys to .env.local before running the app
echo - OpenAI: https://platform.openai.com/api-keys
echo - Google Gemini: https://makersuite.google.com/app/apikey
echo - Anthropic: https://console.anthropic.com/
pause
