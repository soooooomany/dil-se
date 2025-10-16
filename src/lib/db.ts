import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '8137',
  host: 'localhost',
  port: 5432,
  database: 'dilse'
});

export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('Database Error:', err);
    throw err;
  }
}

export async function getClient() {
  const client = await pool.connect();
  return client;
}

export default pool;