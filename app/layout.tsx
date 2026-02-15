import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jake's Mission Control",
  description: "Central hub for all projects and tools",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
