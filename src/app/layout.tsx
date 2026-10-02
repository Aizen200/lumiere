import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Vault Release | Fraser & Hawes — Silversmiths Since 1869",
  description: "Silver made at yesterday's price. Yours today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#c5a880]/25 selection:text-[#141312] bg-[#fbfbf9] text-[#141312]">
        {children}
      </body>
    </html>
  );
}
