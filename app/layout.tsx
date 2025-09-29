import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KFC - It's finger lickin' good",
  description: "Order KFC's Original Recipe chicken online for delivery or pickup. Enjoy our famous fried chicken, burgers, twisters, and more.",
  keywords: "KFC, Kentucky Fried Chicken, fast food, chicken, delivery, burgers, twisters",
  openGraph: {
    title: "KFC - It's finger lickin' good",
    description: "Order KFC's Original Recipe chicken online",
    images: ["/assets/img/kfc-og.jpg"],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <Header />
        <main className="min-h-screen bg-white">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
