import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Vault Release | Fraser & Hawes — Silversmiths Since 1869",
  description: "Silver made at yesterday's price. Yours today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased selection:bg-[#c5a880]/25 selection:text-[#141312] bg-[#fbfbf9] text-[#141312]">
        {children}
      </body>
    </html>
  );
}
