const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

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

async function migrate() {
    const client = new Client(config);

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected.');

        const schemaPath = path.join(__dirname, '..', 'src', 'lib', 'db', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema migration...');
        // Split by semicolon to run statements individually if needed, but pg usually handles it.
        // However, schema.sql has multiple statements.
        await client.query(schemaSql);

        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

migrate();
