import { ApolloProvider, Drawer, ThemeProvider } from "@/components";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Providers } from "@/lib/redux/provider";
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
  return (
    <html lang="en" className={`${poppins.className}`}>
      <head />
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
