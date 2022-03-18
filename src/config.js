import dotenv from 'dotenv';
dotenv.config();

export default {
  ENV: process.env.ENV || 'DEV',
  PORT: process.env.PORT || 3000,
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'tokendb',
  MONGO_USER: process.env.MONGO_USER || 'admin',
  MONGO_PASS: process.env.MONGO_PASS || 'admin',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost'
}