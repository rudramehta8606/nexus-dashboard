import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Layout/Sidebar";

export const metadata: Metadata = {
  title: "Nexus Portfolio Dashboard",
  description: "A premium full-stack dashboard for high-end portfolio management.",
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
