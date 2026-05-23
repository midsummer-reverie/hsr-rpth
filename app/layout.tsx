import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Honkai: Star Rail - RoleplayTH",
  description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
  icons: {
    icon: "https://iili.io/CHYGJef.png",
    apple: "https://iili.io/CHYGJef.png",
  },
  openGraph: {
    title: "Honkai: Star Rail - RoleplayTH",
    description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
    url: "https://hsr-rpth.vercel.app",
    siteName: "HSR RPTH",
    images: [
      {
        url: "https://hsr-rpth.vercel.app/Honkai-Star-Rail-Logo3.png",
        width: 1200,
        height: 630,
        alt: "HSR Roleplay TH Database Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honkai: Star Rail - RoleplayTH",
    description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
    images: ["https://hsr-rpth.vercel.app/Honkai-Star-Rail-Logo3.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-[#0B0B12]`}>
      
      {/* 👇 เพิ่ม <head> โหลดฟอนต์ Google Sans ให้ถูกหลักการ 👇 */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet" />
      </head>

      {/* 👇 บังคับใส่ style fontFamily ไว้ที่ body เพื่อให้ซึมซับไปถึงทุก Element ทั่วเว็บ 👇 */}
      <body 
        className="min-h-screen w-full flex flex-col overflow-x-hidden bg-[#0B0B12] text-slate-200 antialiased relative" 
        style={{ fontFamily: '"Google Sans", sans-serif' }}
        suppressHydrationWarning
      >
        <div className="flex-1 w-full relative z-10 pb-16"> 
          {children}
        </div>

        {/* ================= FOOTER CREDIT ================= */}
        <div className="absolute bottom-4 right-6 md:right-10 z-20 pointer-events-none opacity-50 hover:opacity-100 transition-opacity duration-300">
          <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-mono">
            © Honkai: Star Rail - RoleplayTH, 2026
          </p>
        </div>

      </body>
    </html>
  );
}