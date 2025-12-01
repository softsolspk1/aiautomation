const { Client } = require('pg');

const config = {
    user: 'postgres',
    password: '8d+cP@5*?E_p8eZ',
    host: 'db.gojkwufkuzeirzplcdix.supabase.co',
    port: 5432,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false,
    },
};

async function applyRLS() {
    const client = new Client(config);

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected.');

        const rlsSql = `
      -- Enable Row Level Security (RLS)
      ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
      ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
      ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
      ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;

      -- Drop existing policies to avoid errors on re-run
      DROP POLICY IF EXISTS "Public listings are viewable by everyone" ON marketplace_listings;
      DROP POLICY IF EXISTS "Users can insert their own listings" ON marketplace_listings;
      DROP POLICY IF EXISTS "Users can update their own listings" ON marketplace_listings;
      DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
      DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
      DROP POLICY IF EXISTS "Users can view their own transactions" ON transactions;
      DROP POLICY IF EXISTS "Users can create transactions" ON transactions;
      DROP POLICY IF EXISTS "Developer profiles are viewable by everyone" ON developer_profiles;
      DROP POLICY IF EXISTS "Users can manage their own profile" ON developer_profiles;

      -- Re-create Policies
      CREATE POLICY "Public listings are viewable by everyone" ON marketplace_listings
        FOR SELECT USING (status = 'published');

      CREATE POLICY "Users can insert their own listings" ON marketplace_listings
        FOR INSERT WITH CHECK (auth.uid() = seller_id);

      CREATE POLICY "Users can update their own listings" ON marketplace_listings
        FOR UPDATE USING (auth.uid() = seller_id);

      CREATE POLICY "Reviews are viewable by everyone" ON reviews
        FOR SELECT USING (true);

      CREATE POLICY "Authenticated users can create reviews" ON reviews
        FOR INSERT WITH CHECK (auth.uid() = user_id);

      CREATE POLICY "Users can view their own transactions" ON transactions
        FOR SELECT USING (auth.uid() = buyer_id);

      CREATE POLICY "Users can create transactions" ON transactions
        FOR INSERT WITH CHECK (auth.uid() = buyer_id);

      CREATE POLICY "Developer profiles are viewable by everyone" ON developer_profiles
        FOR SELECT USING (true);

      CREATE POLICY "Users can manage their own profile" ON developer_profiles
        FOR ALL USING (auth.uid() = user_id);
    `;

        console.log('Applying RLS policies...');
        await client.query(rlsSql);

        console.log('RLS policies applied successfully.');
    } catch (err) {
        console.error('RLS application failed:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

applyRLS();
