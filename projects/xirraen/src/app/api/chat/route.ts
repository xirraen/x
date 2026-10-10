import { NextRequest, NextResponse } from "next/server";
import { getChatSql, chatDatabaseReady } from "@/lib/global-chat/db";
import { parseContent, parseProfile } from "@/lib/global-chat/validation";
import { getClientIp, rateMessage } from "@/lib/global-chat/rate-limit";
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

export async function GET(request: NextRequest) {
  if (!chatDatabaseReady()) return NextResponse.json({ error: "Database Neon belum dikonfigurasi." }, { status: 503 });
  try {
    const sql = getChatSql();
    const params = request.nextUrl.searchParams;
    const afterCreatedAt = params.get("afterCreatedAt");
    const afterId = params.get("afterId");
    const limit = Math.min(Math.max(Number(params.get("limit") || 50), 1), 100);
    const rows = afterCreatedAt && afterId
      ? await sql`select id, display_name, contact_handle, contact_platform, content, role, created_at from global_messages where (created_at,id) > (${afterCreatedAt}::timestamptz, ${afterId}::uuid) order by created_at,id limit 100`
      : await sql`select id, display_name, contact_handle, contact_platform, content, role, created_at from (select id, display_name, contact_handle, contact_platform, content, role, created_at from global_messages order by created_at desc,id desc limit ${limit}) q order by created_at,id`;
    return NextResponse.json({ messages: rows.map((row) => mapMessage(row as DbRow)) });
  } catch {
    return NextResponse.json({ error: "Chat belum dapat dimuat." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!chatDatabaseReady()) return NextResponse.json({ error: "Database Neon belum dikonfigurasi." }, { status: 503 });

  let guestProfile;
  let content: string;
  try {
    const body = await request.json();
    guestProfile = parseProfile(body);
    content = parseContent(body.content);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Permintaan tidak valid." }, { status: 400 });
  }

  try {
    rateMessage(guestProfile.guestId, getClientIp(request.headers), content);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Terlalu banyak permintaan." }, { status: 429 });
  }

  try {
    const sql = getChatSql();
    const rows = await sql`select * from send_global_message(${guestProfile.guestId}::uuid, ${guestProfile.displayName}, ${guestProfile.contactHandle ?? null}, ${guestProfile.contactPlatform ?? "unknown"}, ${content}, 'guest')`;
    return NextResponse.json({ message: mapMessage(rows[0] as DbRow) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Pesan belum dapat disimpan. Periksa konfigurasi database." }, { status: 500 });
  }
}
