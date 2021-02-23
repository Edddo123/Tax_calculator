import { number } from "joi";
import { Pool } from "pg";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(path.dirname(require.main!.filename), ".env") }) //we have to call it in every file we want to use it



const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  max: 10,
  connectionTimeoutMillis: 0 
});

export default pool;
 