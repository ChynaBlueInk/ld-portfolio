// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";                     // ⬅️ add this
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L&D Portfolio",
  description: "Showcase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-[#f9f8f7] text-[#321709]">
              {/* Wrap any client comp using router hooks */}
              <Suspense fallback={null}>
                <Header />
              </Suspense>

              {/* Wrap the page content since some pages use useSearchParams */}
              <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading…</div>}>
                <main className="flex-1">{children}</main>
              </Suspense>

              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
