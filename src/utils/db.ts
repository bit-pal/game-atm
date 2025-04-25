import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Initilize the DB
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to query the database
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
