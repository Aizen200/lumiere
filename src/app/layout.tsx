import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Vault Release | Fraser & Hawes — Silversmiths Since 1869",
  description: "Silver made at yesterday's price. Yours today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${montserrat.variable}`}
    >
      <body className="antialiased selection:bg-[#9e7d4f]/30 selection:text-[#f8f5ee]">
        {children}
      </body>
    </html>
  );
}
