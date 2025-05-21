import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT || 5000,
  APP_HOST: process.env.APP_HOST,

  DATABASE_URL: process.env.DATABASE_URL,

  NODE_ENV: process.env.NODE_ENV,
};
