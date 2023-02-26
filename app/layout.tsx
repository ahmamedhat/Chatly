"use client";

import { ApolloProvider } from "@apollo/client";
import { Drawer, Footer } from "@/components";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Providers } from "@/lib/redux/provider";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "@next/font/google";
import client from "@/lib/api/apollo";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/redux/store";
import Head from "./head";

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
      <head>
        <Head />
      </head>
      <SessionProvider>
        <body className="bg-white dark:bg-dark min-h-screen flex flex-col">
          <ApolloProvider client={client}>
            <Providers>
              <PersistGate loading={null} persistor={persistor}>
                {mounted && (
                  <ThemeProvider enableSystem={true} attribute="class">
                    <main>
                      <Drawer>{children}</Drawer>
                    </main>
                    <div className="m-auto" />
                    {path == "/about" && <Footer />}
                  </ThemeProvider>
                )}
              </PersistGate>
            </Providers>
          </ApolloProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
