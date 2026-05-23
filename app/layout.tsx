import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0B0B12", // บังคับให้ขอบบราวเซอร์บนมือถือเป็นสีดาร์คโหมด
};

export const metadata: Metadata = {
  title: "Honkai: Star Rail - RoleplayTH",
  description: "หน้าระบบสำหรับกิจกรรม Honkai: Star Rail",

  icons: {
    icon: "https://iili.io/CHYGJef.png", 
    apple: "https://iili.io/CHYGJef.png", 
  }, // <--- เติมปีกกาปิดของ icons ตรงนี้ให้แล้วครับ

openGraph: {
    title: "Honkai: Star Rail - RoleplayTH",
    description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
    url: "https://hsr-rpth.vercel.app", 
    siteName: "HSR RPTH",
    images: [
      {
        // แก้เป็น URL เต็มรูปแบบที่ชี้ไปยังไฟล์ในโฟลเดอร์ public
        url: "https://hsr-rpth.vercel.app/Honkai-Star-Rail-Logo3.png", 
        width: 1200,                       
        height: 630,
        alt: "HSR Roleplay TH Database Preview",
      },
    ],
    type: "website",
  },

  // ตั้งค่าการแสดงผลสำหรับการแชร์ลง Twitter / X
  twitter: {
    card: "summary_large_image", 
    title: "Honkai: Star Rail - RoleplayTH",
    description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
    images: ["https://hsr-rpth.vercel.app/Honkai-Star-Rail-Logo3.png"], // แก้เป็น URL เต็มรูปแบบเช่นกัน
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
