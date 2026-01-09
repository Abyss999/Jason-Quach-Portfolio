import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-orange-500`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative min-h-screen">
            {/* Background Glow Effects */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              {/* Soft wash - darker in light mode, subtle in dark mode */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent dark:from-orange-500/5" />
              
              {/* Glow orbs - stronger in light mode for visibility */}
              <div className="absolute -left-64 top-[-160px] h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-3xl dark:bg-orange-500/15" />
              <div className="absolute right-[-260px] top-[20%] h-[520px] w-[520px] rounded-full bg-orange-500/15 blur-3xl dark:bg-orange-500/10" />
              <div className="absolute left-[30%] bottom-[-260px] h-[520px] w-[520px] rounded-full bg-orange-500/15 blur-3xl dark:bg-orange-500/10" />
            </div>

            <NavBar />
            <main className="flex-1 pb-12">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}