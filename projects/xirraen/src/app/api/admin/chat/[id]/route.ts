import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/global-chat/auth";
import { getChatSql, chatDatabaseReady } from "@/lib/global-chat/db";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  if (!chatDatabaseReady()) return NextResponse.json({ error: "Database Neon belum dikonfigurasi." }, { status: 503 });
  try {
    const sql = getChatSql();
    await sql`delete from global_messages where id = ${id}::uuid`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Pesan belum dapat dihapus." }, { status: 500 });
  }
}
