type GuestEntry = { count: number; resetAt: number; lastAt: number; content: string };
const guestMessages = new Map<string, GuestEntry>();
const ipMessages = new Map<string, number[]>();

type LoginEntry = { failures: number; lockUntil: number };
const loginAttempts = new Map<string, LoginEntry>();
const LOGIN_MAX_FAILURES = 5;
const LOGIN_LOCK_MS = 15 * 60_000;

function hitGuest(guestId: string, content: string) {
  const now = Date.now();
  const entry = guestMessages.get(guestId);
  if (!entry || entry.resetAt < now) {
    guestMessages.set(guestId, { count: 1, resetAt: now + 3_600_000, lastAt: now, content });
    return;
  }
  if (now - entry.lastAt < 10_000) throw new Error("Tunggu 10 detik sebelum mengirim lagi.");
  if (entry.count >= 10) throw new Error("Batas 10 pesan per jam tercapai.");
  if (entry.content === content && now - entry.lastAt < 60_000) throw new Error("Pesan yang sama baru saja dikirim.");
  entry.count += 1;
  entry.lastAt = now;
  entry.content = content;
}

function hitIp(ip: string) {
  const now = Date.now();
  const hourAgo = now - 3_600_000;
  const timestamps = (ipMessages.get(ip) ?? []).filter((time) => time > hourAgo);
  if (timestamps.length >= 30) throw new Error("Terlalu banyak pesan dari jaringan ini, coba lagi nanti.");
  timestamps.push(now);
  ipMessages.set(ip, timestamps);
}

export function rateMessage(guestId: string, ip: string, content: string) {
  hitGuest(guestId, content);
  hitIp(ip);
}

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

export function checkLogin(ip: string) {
  const entry = loginAttempts.get(ip);
  if (entry && entry.lockUntil > Date.now()) throw new Error("Terlalu banyak percobaan. Coba lagi dalam beberapa menit.");
}

export function failLogin(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip) ?? { failures: 0, lockUntil: 0 };
  entry.failures += 1;
  if (entry.failures >= LOGIN_MAX_FAILURES) {
    entry.lockUntil = now + LOGIN_LOCK_MS;
    entry.failures = 0;
  }
  loginAttempts.set(ip, entry);
}

export function resetLogin(ip: string) {
  loginAttempts.delete(ip);
}
