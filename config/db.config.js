import * as dotenv from 'dotenv';

// Start dotenv service
dotenv.config();

// Config data for database
const dbConfig = {
  db: process.env.MONGODB_URL,
}

export default dbConfig;