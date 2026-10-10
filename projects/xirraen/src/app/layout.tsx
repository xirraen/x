import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "xirraen — Riset, rekayasa, produk digital",
  description:
    "Ruang personal xirraen: pengembangan perangkat lunak, riset teknis, dan produk digital yang praktis.",
  openGraph: {
    title: "xirraen — Riset, rekayasa, produk digital",
    description:
      "Pengembang independen yang membangun produk digital praktis dengan riset cermat dan rekayasa yang bertanggung jawab.",
    type: "website",
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
