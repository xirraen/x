"use client";

import { useState } from "react";

type WalletAddressButtonProps = {
  address: string;
};

export default function WalletAddressButton({ address }: WalletAddressButtonProps) {
  const [copied, setCopied] = useState(false);
  const shortAddress = `${address.slice(0, 6)}…${address.slice(-4)}`;

  async function copyAddress() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const field = document.createElement("textarea");
        field.value = address;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const didCopy = document.execCommand("copy");
        field.remove();
        if (!didCopy) throw new Error("Clipboard unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className={`wallet-address-button${copied ? " is-copied" : ""}`}
      type="button"
      onClick={copyAddress}
      aria-label={copied ? "Alamat wallet tersalin" : `Ketuk untuk menyalin alamat wallet ${address}`}
      title={copied ? "Tersalin" : "Ketuk untuk menyalin alamat wallet"}
    >
      <span className="wallet-address-label">ON-CHAIN</span>
      <span className="wallet-address-value" title={address}>{shortAddress}</span>
      <span className="copy-icon" aria-hidden="true">
        {copied ? (
          <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : (
          <svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        )}
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Alamat wallet tersalin ke clipboard." : ""}</span>
    </button>
  );
}
