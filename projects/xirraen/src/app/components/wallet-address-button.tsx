"use client";

import { useState } from "react";

type WalletAddressButtonProps = {
  address: string;
};

type CopyState = "idle" | "copied" | "error";

export default function WalletAddressButton({ address }: WalletAddressButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function copyAddress() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const field = document.createElement("textarea");
        field.value = address;
        field.setAttribute("readonly", "");
        field.setAttribute("aria-hidden", "true");
        field.style.position = "fixed";
        field.style.opacity = "0";
        field.style.pointerEvents = "none";
        document.body.appendChild(field);
        field.select();
        const didCopy = document.execCommand("copy");
        field.remove();
        if (!didCopy) throw new Error("Clipboard unavailable");
      }
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2400);
    }
  }

  const statusText =
    copyState === "copied" ? "Tersalin" : copyState === "error" ? "Gagal menyalin" : "Salin";

  return (
    <button
      className="wallet-address-button"
      type="button"
      onClick={copyAddress}
      aria-label="Ketuk untuk menyalin alamat wallet"
      aria-describedby="wallet-copy-status"
    >
      <span className="wallet-address-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="wallet-svg">
          <path d="M4.75 7.25A2.25 2.25 0 0 1 7 5h11.25A2.75 2.75 0 0 1 21 7.75v9.5A2.75 2.75 0 0 1 18.25 20H6.5A3.5 3.5 0 0 1 3 16.5v-9A2.25 2.25 0 0 1 5.25 5H7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 13h5M4 8h14.25A2.75 2.75 0 0 1 21 10.75v4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="16.2" cy="13" r="1" fill="currentColor" />
        </svg>
      </span>
      <span className="wallet-address-copy">
        <span className="wallet-address-label">EVM WALLET · TAP TO COPY</span>
        <span className="wallet-address-value">{address}</span>
      </span>
      <span
        id="wallet-copy-status"
        className={`copy-indicator${copyState === "copied" ? " is-copied" : ""}`}
        aria-live="polite"
        role="status"
      >
        {statusText}
      </span>
    </button>
  );
}
