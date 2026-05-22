// app/admin/page.tsx
'use client'; // หน้านี้ต้องโต้ตอบกับผู้ใช้ เลยต้องใช้ Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--hsr-panel-bg': 'rgba(20, 20, 28, 0.8)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตั้งรหัสผ่านแบบง่ายๆ ไว้ก่อน (เดี๋ยวค่อยแก้ไปใช้ .env ทีหลัง)
    if (password === 'astral2026') {
      setError(false);
      // ถ้ารหัสถูก ให้เด้งไปหน้า Dashboard ของจริง (ซึ่งเราจะสร้างกันเป็นหน้าถัดไป)
      router.push('/admin/dashboard');
    } else {
      setError(true);
      setPassword(''); // เคลียร์ช่องพิมพ์
    }
  };

  return (
    <main 
      className="min-h-screen text-gray-200 relative flex items-center justify-center p-6"
      style={{ ...themeStyles, backgroundColor: '#0B0B12' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}} />

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,197,127,0.03)_0%,transparent_50%)] pointer-events-none" />

      {/* Login Panel */}
      <div 
        className="w-full max-w-md border border-[#E5C57F]/20 rounded-sm relative overflow-hidden backdrop-blur-md stagger-up shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: 'var(--hsr-panel-bg)', '--delay': '0.1s' } as React.CSSProperties}
      >
        {/* Animated Scanline */}
        <div className="absolute inset-0 w-full h-16 bg-gradient-to-b from-transparent via-[#E5C57F]/10 to-transparent pointer-events-none" style={{ animation: 'scanline 4s linear infinite' }} />

        <div className="p-8 md:p-10 relative z-10">
          
          <Link href="/" className="text-gray-500 hover:text-[#E5C57F] text-xs tracking-[0.2em] transition-colors flex items-center gap-2 mb-8">
             ← RETURN TO MENU
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-light tracking-[0.2em] text-[#E5C57F] mb-1 uppercase">
              Admin <span className="font-bold">Access</span>
            </h1>
            <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">Astral Express Logistics</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="block text-xs text-gray-500 tracking-[0.2em] uppercase mb-2">
                Authentication Code
              </label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 outline-none transition-all focus:border-[#E5C57F] tracking-[0.5em] font-mono text-center rounded-sm"
                  placeholder="••••••••"
                  autoComplete="off"
                  autoFocus
                />
                {/* มุมตกแต่งกรอบ */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E5C57F] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E5C57F] opacity-0 group-focus-within:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 p-3 flex items-center gap-3 rounded-sm animate-pulse">
                <span className="text-red-500 text-sm">⚠️</span>
                <span className="text-red-400 text-xs tracking-widest font-mono uppercase">Access Denied. Incorrect Code.</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-white/5 hover:bg-[#E5C57F]/10 border border-[#E5C57F]/30 hover:border-[#E5C57F] text-[#E5C57F] py-3 tracking-[0.3em] uppercase text-xs font-bold transition-all duration-300 rounded-sm"
            >
              Verify Identity
            </button>
            
          </form>

        </div>
      </div>
    </main>
  );
}