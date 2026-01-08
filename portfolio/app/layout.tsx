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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-orange-500">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              {/* soft wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent"/>
              {/* glow */}
              <div className="absolute -left-64 top-[-160px] h-[520px] w-[520px] rounded-full bg-orange-500/15 blur-3xl" />
              <div className="absolute right-[-260px] top-[20%] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute left-[30%] bottom-[-260px] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
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