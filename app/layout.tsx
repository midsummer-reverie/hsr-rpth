import type { Metadata } from "next";
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
  description: "หน้าระบบสำหรับกิจกรรม Honkai: Star Rail",

  icons: {
    icon: "https://iili.io/CHYGJef.png", 
    apple: "https://iili.io/CHYGJef.png", 
  }, // <--- เติมปีกกาปิดของ icons ตรงนี้ให้แล้วครับ

  openGraph: {
    title: "HSR Roleplay TH | Database",
    description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
    url: "https://hsr-rpth.vercel.app", 
    siteName: "HSR Roleplay TH",
    images: [
      {
        url: "https://iili.io/CHYeEF4.png", // เปลี่ยนลิงก์ภาพแล้ว
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
    title: "HSR Roleplay TH | Database",
    description: "ระบบจัดการฐานข้อมูลและบอทสำหรับโปรเจกต์ HSR RP",
    images: ["https://iili.io/CHYeEF4.png"], // เปลี่ยนลิงก์ภาพแล้ว
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
