import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jake's Mission Control",
  description: "Central hub for all projects and tools",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Jake's Mission Control",
    description: "Central hub for all projects and tools",
    images: [
      {
        url: "https://hub.nsprd.com/assets/hub-og.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
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
