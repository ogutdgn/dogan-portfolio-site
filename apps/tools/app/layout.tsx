import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "tools.ogutdgn",
  description: "A collection of tools built by Dogan Ogut",
  openGraph: {
    title: "tools.ogutdgn",
    description: "A collection of tools built by Dogan Ogut",
    url: "https://tools.ogutdgn.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-void grid-bg noise antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
