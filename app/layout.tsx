// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/header";   // ⬅️ use Header instead of Navbar
import Footer from "@/components/footer";   // ⬅️ new footer

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
              <Header />                 {/* ⬅️ now using Header */}
              <main className="flex-1">{children}</main>
              <Footer />                 {/* ⬅️ always visible footer */}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
