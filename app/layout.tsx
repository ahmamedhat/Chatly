"use client";

import { Header } from "@/components";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

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
      <body className="bg-white dark:bg-black">
        {mounted && (
          <ThemeProvider enableSystem={true} attribute="class">
            <Header appName="C H A T L Y" />
            <div className="px-4">{children}</div>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
