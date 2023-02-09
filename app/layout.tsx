"use client";

import { Footer, Header } from "@/components";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-white dark:bg-dark min-h-screen flex flex-col">
        {mounted && (
          <ThemeProvider enableSystem={true} attribute="class">
            <Header appName="C H A T L Y" />
            <main className="px-4">{children}</main>
            <div className="m-auto" />
            {path !== "/chat" && <Footer />}
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
