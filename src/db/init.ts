import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
  const pool = new Pool({
    user: 'postgres',
    password: '8137',
    host: 'localhost',
    port: 5432
  });

  try {
    // Create database if it doesn't exist
    await pool.query(`
      SELECT 'CREATE DATABASE dilse'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dilse')
    `);

    // Connect to dilse database
    const dilsePool = new Pool({
      user: 'postgres',
      password: '8137',
      host: 'localhost',
      port: 5432,
      database: 'dilse'
    });

    // Read and execute schema
    const schemaPath = join(__dirname, 'schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf8');
    await dilsePool.query(schemaSql);

    // Insert sample products
    const products = [
      {
        name: 'Classic Sourdough',
        description: 'A traditional sourdough bread with a crispy crust and soft interior',
        image_url: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb',
        price: 7.99,
        category: 'BREAD',
        featured: true,
        stock: 15
      },
      {
        name: 'Chocolate Croissant',
        description: 'Buttery croissant filled with rich dark chocolate',
        image_url: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd',
        price: 4.99,
        category: 'PASTRY',
        featured: true,
        stock: 20
      }
    ];

    for (const product of products) {
      await dilsePool.query(`
        INSERT INTO products (name, description, image_url, price, category, featured, stock)
        VALUES ($1, $2, $3, $4, $5::product_category, $6, $7)
      `, [
        product.name,
        product.description,
        product.image_url,
        product.price,
        product.category,
        product.featured,
        product.stock
      ]);
    }

    console.log('Database initialized successfully!');
    
    await dilsePool.end();
    await pool.end();
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
}

initializeDatabase();