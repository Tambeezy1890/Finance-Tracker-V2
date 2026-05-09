import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  EXPIRES_IN,
  DB_URI,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  FRONTEND_URL,
  JWT_REFRESH_EXPIRE,
  JWT_REFRESH_TOKEN,
} = process.env;
