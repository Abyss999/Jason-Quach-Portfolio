import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jason Quach | Portfolio",
  description: "Computer Science Student | Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-orange-500`}
      >
        <div className = "relative min-h-screen">
          <div aria-hidden className = "pointer-events-none absolute inset-0 -z-10">
            {/* soft wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent"/>
            {/* glow */}
              <div className="absolute -left-64 top-[-160px] h-[520px] w-[520px] rounded-full bg-orange-500/15 blur-3xl" />
              <div className="absolute right-[-260px] top-[20%] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute left-[30%] bottom-[-260px] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
          </div>
          <NavBar />
          {children}
        </div>

      </body>
    </html>
  );
}
