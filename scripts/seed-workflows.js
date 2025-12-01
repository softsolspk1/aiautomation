const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

// Official AgentX User ID (Deterministic for idempotency)
const OFFICIAL_SELLER_ID = '00000000-0000-0000-0000-000000000001';

async function seed() {
    const client = new Client(config);

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected.');

        // 1. Ensure Official User exists
        console.log('Ensuring Official User exists...');
        await client.query(`
      INSERT INTO users (id, email, password_hash, name, organization, plan)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO NOTHING
    `, [OFFICIAL_SELLER_ID, 'official@agentx.com', 'hashed_secret', 'AgentX Official', 'AgentX HQ', 'enterprise']);

        await client.query(`
      INSERT INTO developer_profiles (user_id, bio, website, github_handle)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id) DO NOTHING
    `, [OFFICIAL_SELLER_ID, 'The official AgentX team providing high-quality verified agents.', 'https://agentx.com', 'agentx']);

        // 2. Find Workflow Files
        const workflowsDir = path.join(__dirname, '..', 'workflow', 'workflows');
        console.log(`Scanning ${workflowsDir}...`);

        // Recursive function to get all json files
        function getFiles(dir) {
            let results = [];
            const list = fs.readdirSync(dir);
            list.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat && stat.isDirectory()) {
                    results = results.concat(getFiles(filePath));
                } else if (file.endsWith('.json')) {
                    results.push(filePath);
                }
            });
            return results;
        }

        const files = getFiles(workflowsDir);
        console.log(`Found ${files.length} workflow files.`);

        // 3. Insert into Marketplace Listings
        // Limit to first 50 for now to avoid overwhelming the DB in this demo, or do all if fast enough.
        // Let's do 100 to populate the store well.
        const filesToImport = files.slice(0, 100);

        console.log(`Importing ${filesToImport.length} workflows...`);

        for (const file of filesToImport) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                const json = JSON.parse(content);

                const title = json.name || 'Untitled Agent';
                const description = json.description || json.notes || 'No description provided.';
                const tags = json.tags || [];
                const category = json.meta?.category || 'Automation';

                // Random price between 0 and 50
                const price = Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 5 : 0;

                await client.query(`
          INSERT INTO marketplace_listings (seller_id, title, description, price, currency, category, tags, status, images)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
                    OFFICIAL_SELLER_ID,
                    title,
                    description,
                    price,
                    'USD',
                    category,
                    tags,
                    'published',
                    ['/placeholder-agent-' + (Math.floor(Math.random() * 3) + 1) + '.jpg'] // Random placeholder
                ]);
            } catch (e) {
                console.error(`Failed to import ${file}:`, e.message);
            }
        }

        console.log('Seeding completed successfully.');
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

seed();
