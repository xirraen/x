import type { ChatProfile, ContactPlatform } from "./types";

const HANDLE_PATTERN = /^[A-Za-z0-9_]{1,32}$/;
const RESERVED_NAMES = new Set(["admin", "administrator", "admins", "moderator", "mods", "mod", "system"]);

export function isReservedName(name: string) {
  return RESERVED_NAMES.has(name.trim().toLowerCase());
}

export function parseProfile(value: unknown): ChatProfile {
  if (!value || typeof value !== "object") throw new Error("Profil tidak valid.");
  const input = value as Record<string, unknown>;
  const guestId = String(input.guestId ?? "");
  const displayName = String(input.displayName ?? "").trim();
  const rawHandle = String(input.contactHandle ?? "").trim().replace(/^@+/, "");
  const platform = String(input.contactPlatform ?? "unknown");

  if (!/^[0-9a-f-]{36}$/i.test(guestId)) throw new Error("Guest ID tidak valid.");
  if (displayName.length < 2 || displayName.length > 24) throw new Error("Nama panggilan harus 2–24 karakter.");
  if (isReservedName(displayName)) throw new Error("Nama panggilan ini tidak dapat digunakan.");
  if (rawHandle && !HANDLE_PATTERN.test(rawHandle)) throw new Error("Username Telegram/X tidak valid.");

  return {
    guestId,
    displayName,
    contactHandle: rawHandle ? `@${rawHandle}` : undefined,
    contactPlatform: (["x", "telegram", "unknown"].includes(platform) ? platform : "unknown") as ContactPlatform,
  };
}

export function parseContent(value: unknown) {
  const content = String(value ?? "").trim();
  if (!content || content.length > 300) throw new Error("Pesan harus 1–300 karakter.");
  return content;
}
