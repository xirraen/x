import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/global-chat/auth";
import { getChatSql, chatDatabaseReady } from "@/lib/global-chat/db";
import { parseContent } from "@/lib/global-chat/validation";
import type { ChatMessage } from "@/lib/global-chat/types";

type DbRow = Record<string, unknown>;
function mapMessage(row: DbRow): ChatMessage {
  return {
    id: String(row.id),
    displayName: String(row.display_name),
    contactHandle: row.contact_handle == null ? null : String(row.contact_handle),
    contactPlatform: String(row.contact_platform) as ChatMessage["contactPlatform"],
    content: String(row.content),
    role: String(row.role) as ChatMessage["role"],
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!chatDatabaseReady()) return NextResponse.json({ error: "Database Neon belum dikonfigurasi." }, { status: 503 });

  let content: string;
  try {
    content = parseContent((await request.json()).content);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Pesan tidak valid." }, { status: 400 });
  }
  try {
    const sql = getChatSql();
    const rows = await sql`select * from send_global_message(${"00000000-0000-0000-0000-000000000001"}::uuid, ${"Admin"}, ${null}, ${"unknown"}, ${content}, ${"admin"})`;
    return NextResponse.json({ message: mapMessage(rows[0] as DbRow) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Balasan belum dapat disimpan." }, { status: 500 });
  }
}
