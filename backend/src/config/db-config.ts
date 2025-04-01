import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL || !process.env.DATABASE_API) {
  throw new Error("Missing Supabase environment variables!");
}

export const database = createClient(
  process.env.DATABASE_URL as string,
  process.env.DATABASE_API as string
);
