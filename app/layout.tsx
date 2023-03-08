import React from "react";
import { ApolloProvider, Drawer, ThemeProvider } from "@/components";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Providers } from "@/lib/redux/provider";
import { Poppins } from "@next/font/google";
import { Metadata } from "next";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chatly",
    template: "%s | Chatly",
  },
  description: "Realtime chat app using socket.io",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className="bg-white dark:bg-dark min-h-screen flex flex-col">
        <ApolloProvider>
          <Providers>
            <ThemeProvider>
              <Drawer>{children}</Drawer>
              <div className="m-auto" />
            </ThemeProvider>
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
