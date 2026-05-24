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
        url: "https://iili.io/CHYeEF4.png",
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
    images: ["Honkai-Star-Rail-Logo3.png"],
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
      {/* เพิ่ม relative เพื่อเป็นกล่องหลักให้ Footer อ้างอิงพิกัด */}
      <body className="min-h-screen w-full flex flex-col overflow-x-hidden bg-[#0B0B12] text-slate-200 antialiased relative" suppressHydrationWarning>
        
        {/* ส่วนเนื้อหาหลักของเว็บ (เช่น หน้า Home, หน้า NPC, etc.) */}
        {/* เราสั่งให้ flex-1 เพื่อดัน Footer ลงไปอยู่ล่างสุดเสมอ */}
        <div className="flex-1 w-full relative z-10 pb-16"> 
          {children}
        </div>

        {/* ================= FOOTER CREDIT (แสดงทุกหน้า) ================= */}
        {/* ตำแหน่ง absolute เพื่อให้เกาะอยู่ขอบล่างของหน้าจอ/เนื้อหาเสมอ */}
        <div className="absolute bottom-4 right-6 md:right-10 z-20 pointer-events-none opacity-50 hover:opacity-100 transition-opacity duration-300">
          <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-mono">
            © Honkai: Star Rail - RoleplayTH, 2026
          </p>
        </div>

      </body>
    </html>
  );
}