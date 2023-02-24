import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  db: process.env.MONGODB_URL,
}

export default dbConfig;