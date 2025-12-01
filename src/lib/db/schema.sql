-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  organization VARCHAR(255),
  plan VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bots table
CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  system_prompt TEXT,
  skills TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bot executions table
CREATE TABLE IF NOT EXISTS bot_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  input TEXT NOT NULL,
  output TEXT,
  tokens_used INTEGER,
  duration_ms INTEGER,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'processing',
  extracted_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Knowledge items table
CREATE TABLE IF NOT EXISTS knowledge_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  nodes JSONB NOT NULL,
  edges JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bots_user_id ON bots(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_executions_bot_id ON bot_executions(bot_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_items_bot_id ON knowledge_items(bot_id);
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);

-- Marketplace: Developer Profiles
CREATE TABLE IF NOT EXISTS developer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  bio TEXT,
  website VARCHAR(255),
  github_handle VARCHAR(255),
  payout_info JSONB, -- Stripe Connect ID etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace: Listings
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL, -- Optional if selling a template vs access
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'USD',
  category VARCHAR(50),
  tags TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, suspended
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace: Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace: Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES marketplace_listings(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) NOT NULL, -- pending, completed, failed, refunded
  payment_provider_id VARCHAR(255), -- Stripe PaymentIntent ID
  created_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace Indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_seller_id ON marketplace_listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_transactions_buyer_id ON transactions(buyer_id);

-- Enable Row Level Security (RLS)
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Listings: Everyone can view published listings. Sellers can edit their own.
CREATE POLICY "Public listings are viewable by everyone" ON marketplace_listings
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can insert their own listings" ON marketplace_listings
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own listings" ON marketplace_listings
  FOR UPDATE USING (auth.uid() = seller_id);

-- Reviews: Everyone can view. Users can create reviews for listings they bought (simplified for MVP: any auth user).
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transactions: Users can view their own transactions.
CREATE POLICY "Users can view their own transactions" ON transactions
  FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Developer Profiles: Public view, owner edit.
CREATE POLICY "Developer profiles are viewable by everyone" ON developer_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own profile" ON developer_profiles
  FOR ALL USING (auth.uid() = user_id);
