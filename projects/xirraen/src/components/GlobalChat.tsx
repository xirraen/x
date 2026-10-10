"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProfileModal } from "@/components/ProfileModal";
import type { ChatMessage, ChatProfile } from "@/lib/global-chat/types";

type ChatStatus = "loading" | "ready" | "offline";
const PROFILE_KEY = "global_chat_profile";

export function GlobalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [profile, setProfile] = useState<ChatProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<ChatStatus>("loading");
  const feedRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async (initial = false) => {
    try {
      const response = await fetch("/api/chat?limit=50", { cache: "no-store" });
      if (!response.ok) {
        setStatus("offline");
        return;
      }
      const data = (await response.json()) as { messages: ChatMessage[] };
      const feed = feedRef.current;
      const nearBottom = !feed || feed.scrollHeight - feed.scrollTop - feed.clientHeight < 80;
      setMessages(data.messages);
      setStatus("ready");
      if (initial || nearBottom) {
        requestAnimationFrame(() => {
          if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
        });
      }
    } catch {
      setStatus("offline");
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) setProfile(JSON.parse(saved) as ChatProfile);
    } catch {
      localStorage.removeItem(PROFILE_KEY);
    }

    void loadMessages(true);
    const interval = window.setInterval(() => {
      if (!document.hidden) void loadMessages();
    }, 15_000);
    return () => window.clearInterval(interval);
  }, [loadMessages]);

  async function sendMessage() {
    if (!profile || !text.trim()) return;
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...profile, content: text }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: ChatMessage; error?: string };
      if (!response.ok || !data.message) {
        setError(data.error ?? "Pesan belum dapat dikirim.");
        if (response.status === 503) setStatus("offline");
        return;
      }
      setText("");
      setMessages((current) => [...current, data.message!].slice(-100));
      requestAnimationFrame(() => {
        if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
      });
    } catch {
      setError("Koneksi chat belum tersedia.");
      setStatus("offline");
    }
  }

  function saveProfile(nextProfile: ChatProfile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    setProfile(nextProfile);
    setModalOpen(false);
  }

  return (
    <section className="gc-chat" aria-label="Global Chat">
      <header className="gc-head">
        <span>Global Chat</span>
        <span className="gc-count">{status === "ready" ? messages.length : "—"}</span>
      </header>
      <div className="gc-feed" ref={feedRef} role="log" aria-live="polite">
        {status === "loading" && <p className="gc-empty">Menghubungkan chat…</p>}
        {status === "offline" && (
          <div className="gc-offline" role="status">
            <span className="gc-offline-dot" aria-hidden="true" />
            <strong>Chat menunggu koneksi database</strong>
            <p>Antarmuka Global Chat dari ZIP sudah dipasang. Pesan belum dibaca atau disimpan pada preview ini.</p>
          </div>
        )}
        {status === "ready" && messages.length === 0 && <p className="gc-empty">Belum ada pesan. Jadilah yang pertama mengirim.</p>}
        {messages.map((message) => (
          <article className={`gc-message ${message.role}`} key={message.id}>
            <span className="gc-avatar">{message.role === "admin" ? "A" : message.displayName.slice(0, 2).toUpperCase()}</span>
            <div className="gc-message-content">
              <div className="gc-meta">
                <span>{message.displayName}</span>
                {message.contactHandle && <span className="gc-handle-inline">{message.contactHandle}</span>}
                {message.role === "admin" && <b className="gc-badge">ADMIN</b>}
                <time>{new Date(message.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</time>
              </div>
              <p className="gc-text">{message.content}</p>
            </div>
          </article>
        ))}
      </div>
      <footer className="gc-foot">
        {status !== "ready" ? (
          <p className="gc-offline-foot">Pratinjau sementara · database Neon belum dikonfigurasi</p>
        ) : !profile ? (
          <>
            <button className="gc-primary gc-writing-button" onClick={() => setModalOpen(true)}>Buat nama untuk menulis</button>
          </>
        ) : (
          <>
            <p className="gc-sender">Mengirim sebagai {profile.displayName}<button onClick={() => setModalOpen(true)}>Edit</button></p>
            <div className="gc-composer">
              <input value={text} maxLength={300} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void sendMessage(); } }} placeholder="Tulis pesan…" aria-label="Tulis pesan" />
              <button onClick={() => void sendMessage()} aria-label="Kirim pesan">➤</button>
            </div>
            {error && <p className="gc-error">{error}</p>}
          </>
        )}
      </footer>
      <ProfileModal open={modalOpen} initial={profile} close={() => setModalOpen(false)} save={saveProfile} />
    </section>
  );
}
