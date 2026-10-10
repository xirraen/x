"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { ChatProfile } from "@/lib/global-chat/types";
import { isReservedName } from "@/lib/global-chat/validation";

type ProfileModalProps = {
  open: boolean;
  initial: ChatProfile | null;
  close: () => void;
  save: (profile: ChatProfile) => void;
};

export function ProfileModal({ open, initial, close, save }: ProfileModalProps) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initial?.displayName ?? "");
    setHandle(initial?.contactHandle ?? "");
    setError("");
  }, [open, initial]);

  if (!open) return null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanHandle = handle.trim().replace(/^@+/, "");
    if (cleanName.length < 2 || cleanName.length > 24) return setError("Nama panggilan harus 2–24 karakter.");
    if (isReservedName(cleanName)) return setError("Nama panggilan ini tidak dapat digunakan.");
    if (cleanHandle && !/^[A-Za-z0-9_]{1,32}$/.test(cleanHandle)) return setError("Username tidak valid.");

    save({
      guestId: initial?.guestId ?? crypto.randomUUID(),
      displayName: cleanName,
      contactHandle: cleanHandle ? `@${cleanHandle}` : undefined,
      contactPlatform: cleanHandle ? "telegram" : "unknown",
    });
  }

  return (
    <div className="gc-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <form className="gc-modal" onSubmit={submit} aria-labelledby="gc-modal-title">
        <h2 id="gc-modal-title">Mulai Percakapan</h2>
        <p className="gc-modal-hint">Buat nama ringan untuk mulai menulis</p>
        <label className="gc-field">Nama Panggilan
          <input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Andi / CryptoHunter" maxLength={24} />
        </label>
        <label className="gc-field">Telegram Username (opsional)
          <input value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="@andiweb3" maxLength={33} />
        </label>
        <p className="gc-modal-hint">Username bersifat publik. Data profil tersimpan di browser ini.</p>
        {error && <p className="gc-error">{error}</p>}
        <div className="gc-modal-actions">
          <button type="button" className="gc-secondary" onClick={close}>Batal</button>
          <button className="gc-primary">Mulai chat</button>
        </div>
      </form>
    </div>
  );
}
