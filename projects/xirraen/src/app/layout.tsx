import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xirraen.vercel.app"),
  title: "xirraen — exploring web3 ecosystems",
  description:
    "Profil Web3 xirraen: menjelajahi protokol on-chain, budaya aset digital, dan komunitas yang membentuk internet terbuka.",
  openGraph: {
    title: "xirraen — exploring web3 ecosystems",
    description:
      "Menjelajahi protokol on-chain, budaya aset digital, dan komunitas yang membentuk internet terbuka.",
    type: "website",
    images: ["/xirraen-avatar.webp"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
