"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { ChatMessage } from "@/lib/global-chat/types";

export default function ChatAdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");

  async function loadMessages() {
    const response = await fetch("/api/chat?limit=100", { cache: "no-store" });
    const data = (await response.json().catch(() => ({}))) as { messages?: ChatMessage[]; error?: string };
    if (!response.ok) {
      setError(data.error ?? "Pesan belum dapat dimuat.");
      return;
    }
    setMessages(data.messages ?? []);
    setError("");
  }

  useEffect(() => {
    if (loggedIn) void loadMessages();
  }, [loggedIn]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? (response.status === 401 ? "Password salah." : "Login belum dapat dilakukan."));
      return;
    }
    setLoggedIn(true);
  }

  async function sendReply() {
    const response = await fetch("/api/admin/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: reply }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Balasan belum dapat dikirim.");
      return;
    }
    setReply("");
    await loadMessages();
  }

  async function deleteMessage(id: string) {
    if (!window.confirm("Hapus pesan ini?")) return;
    const response = await fetch(`/api/admin/chat/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Pesan belum dapat dihapus.");
      return;
    }
    await loadMessages();
  }

  return (
    <main className="gc-admin-page">
      <h1>Global Chat Admin</h1>
      {!loggedIn ? (
        <form className="gc-admin-panel gc-admin-login" onSubmit={login}>
          <p className="gc-admin-subtitle">Balas dan moderasi percakapan komunitas.</p>
          <label htmlFor="admin-password">Password admin</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
          <button className="gc-primary">Masuk</button>
          {error && <p className="gc-error">{error}</p>}
        </form>
      ) : (
        <section className="gc-admin-panel">
          <div className="gc-composer">
            <input value={reply} maxLength={300} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void sendReply(); } }} placeholder="Balas sebagai Admin…" aria-label="Balasan admin" />
            <button onClick={() => void sendReply()} aria-label="Kirim balasan">➤</button>
          </div>
          {error && <p className="gc-error">{error}</p>}
          <div className="gc-admin-messages">
            {messages.map((message) => (
              <article className="gc-message" key={message.id}>
                <span className="gc-avatar">{message.role === "admin" ? "A" : message.displayName.slice(0, 2).toUpperCase()}</span>
                <div className="gc-message-content">
                  <div className="gc-meta"><span>{message.displayName}</span><time>{new Date(message.createdAt).toLocaleString("id-ID")}</time></div>
                  <p className="gc-text">{message.content}</p>
                  <button className="gc-secondary" onClick={() => void deleteMessage(message.id)}>Hapus</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
