"use client";

import { Footer, Header } from "@/components";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Providers } from "@/lib/redux/provider";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" className={`${poppins.className}`}>
      <head />
      <body className="bg-white dark:bg-dark min-h-screen flex flex-col">
        <SessionProvider>
          <Providers>
            {mounted && (
              <ThemeProvider enableSystem={true} attribute="class">
                {path !== "/chat" && <Header appName="C H A T L Y" />}
                <main className="px-4">{children}</main>
                <div className="m-auto" />
                {path !== "/chat" && <Footer />}
              </ThemeProvider>
            )}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
