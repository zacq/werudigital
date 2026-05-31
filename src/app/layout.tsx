import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Closest Google Fonts match to Gilroy ExtraBold — rounded geometric, large x-height
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["800"],
});


export const metadata: Metadata = {
  title: "Weru TV & Radio — Watch. Listen. Connect.",
  description: "Your gateway to Weru Digital — live TV, radio, and more.",
  openGraph: {
    title: "Weru TV & Radio",
    description: "Watch. Listen. Connect.",
    siteName: "Weru Digital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
