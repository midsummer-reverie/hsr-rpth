"use client";

import React from 'react';

export default function Loading() {
  // ดึงชุดตัวแปรสีและฟอนต์แบบเดียวกับที่คุณใช้ในหน้าหลักเป๊ะๆ
  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ ...themeStyles, backgroundColor: '#0b0b10' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        @keyframes textGlow {
          0%, 100% { opacity: 0.8; text-shadow: 0 0 5px rgba(229, 197, 127, 0.2); }
          50% { opacity: 1; text-shadow: 0 0 15px rgba(229, 197, 127, 0.6); }
        }
        .animate-text-glow { animation: textGlow 3s ease-in-out infinite; }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

      {/* สัญลักษณ์เรขาคณิตสไตล์มินิมอล (เพชรสีทอง) */}
      <div className="relative w-12 h-12 mb-8">
         <div className="absolute inset-0 border border-[#E5C57F]/30 rotate-45 animate-pulse"></div>
         <div className="absolute inset-2 bg-[#E5C57F]/10 rotate-45 animate-ping" style={{ animationDuration: '2.5s' }}></div>
         <div className="absolute inset-4 bg-[#E5C57F] rotate-45 shadow-[0_0_15px_rgba(229,197,127,0.6)] animate-pulse"></div>
      </div>

      {/* ข้อความโหลดใช้เอฟเฟกต์ textGlow แบบเดียวกับหน้าหลัก */}
      <h2 className="text-2xl font-light tracking-[0.3em] uppercase animate-text-glow text-gray-200 mb-6">
        Accessing <span className="font-bold text-[#E5C57F]">Archive</span>
      </h2>

      {/* เส้นโหลด (Loading Bar) สไตล์ไล่สี Gradient */}
      <div className="w-64 h-[1px] overflow-hidden" style={{ backgroundColor: 'var(--hsr-border)' }}>
        <div 
          className="h-full w-full animate-[scanline_1.5s_ease-in-out_infinite]"
          style={{ background: 'linear-gradient(to right, transparent, var(--hsr-gold), transparent)' }}
        />
      </div>
      
      {/* ข้อความเล็กๆ ด้านล่างให้ดูมีความเป็นระบบฐานข้อมูล */}
      <p className="mt-4 text-[10px] text-gray-500 tracking-widest uppercase italic animate-pulse">
        Retrieving Data ...
      </p>
    </div>
  );
}