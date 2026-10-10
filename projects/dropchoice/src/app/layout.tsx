import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dropchoice — Web3 Airdrop Research",
  description: "A focused workspace to discover, research, and track Web3 airdrop opportunities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
