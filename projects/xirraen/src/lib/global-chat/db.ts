import { neon } from "@neondatabase/serverless";

export function getChatSql() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new Error("DATABASE_URL belum dikonfigurasi untuk Global Chat.");
  return neon(connectionString);
}

export function chatDatabaseReady() {
  return Boolean(process.env.DATABASE_URL?.trim());
}
