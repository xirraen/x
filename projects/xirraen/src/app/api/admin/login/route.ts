import { NextRequest, NextResponse } from "next/server";
import { adminCookie, adminPasswordValid, createAdminToken } from "@/lib/global-chat/auth";
import { checkLogin, failLogin, getClientIp, resetLogin } from "@/lib/global-chat/rate-limit";

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD_HASH?.trim() || !process.env.SESSION_SECRET?.trim()) {
    return NextResponse.json({ error: "Login admin belum dikonfigurasi." }, { status: 503 });
  }
  const ip = getClientIp(request.headers);
  try {
    checkLogin(ip);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Terlalu banyak percobaan." }, { status: 429 });
  }

  let password: unknown;
  try {
    password = (await request.json()).password;
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  if (typeof password !== "string" || !adminPasswordValid(password)) {
    failLogin(ip);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  resetLogin(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, await createAdminToken(), adminCookie.options);
  return response;
}
