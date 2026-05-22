// components/LightConeSlot.tsx
'use client';

import { useState, useEffect } from 'react';

export default function LightConeSlot({ equippedLightCone }: { equippedLightCone: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // จัดการเรื่องการทำ Transition ตอนปิด Modal
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ================= 1. สถานะตอนยังไม่ได้สวมใส่ (ไม่มีกรอบ) =================
  if (!equippedLightCone) {
    return (
      <div className="w-[140px] h-[200px] mx-auto xl:mx-0 bg-transparent relative group cursor-pointer transition-all flex items-center justify-center overflow-hidden">
        <div className="opacity-20 group-hover:opacity-60 group-hover:scale-125 transition-all duration-500">
          <span className="text-4xl font-light text-gray-400 group-hover:text-[#E5C57F]">+</span>
        </div>
      </div>
    );
  }

  const { light_cone, rolled_atk } = equippedLightCone;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalShow {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes overlayShow {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        .animate-modal { animation: modalShow 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-overlay { animation: overlayShow 0.4s ease forwards; }
      `}} />

      {/* ================= 2. สถานะตอนสวมใส่แล้ว (ภาพเพียวๆ ไม่มีกรอบ) ================= */}
      <div 
        onClick={() => setIsOpen(true)}
        className="w-[140px] h-[200px] mx-auto xl:mx-0 relative cursor-pointer group bg-transparent overflow-hidden"
      >
        <img 
          src={light_cone.image_url || 'https://iili.io/C9QECvV.png'} 
          alt={light_cone.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />
      </div>

      {/* ================= 3. Modal System (หน้าต่างรายละเอียด) ================= */}
      {shouldRender && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${isOpen ? 'visible' : 'invisible'}`}>
          
          {/* Backdrop (Overlay) */}
          <div 
            className={`absolute inset-0 bg-black/90 cursor-pointer ${isOpen ? 'animate-overlay' : 'opacity-0 transition-opacity duration-300'}`}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div 
            className={`relative w-full max-w-4xl bg-[#0B0B12] border border-[#E5C57F]/30 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] ${isOpen ? 'animate-modal' : 'opacity-0 scale-95 translate-y-10 transition-all duration-300'}`}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[110] text-[#E5C57F]/60 hover:text-[#E5C57F] hover:scale-110 transition-all p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Splash Art Section (อัตราส่วน 16:9) */}
            <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-[#E5C57F]/20">
              <img 
                src={light_cone.splash_url || 'https://iili.io/your_horizontal_16_9_placeholder.png'} 
                alt="Light Cone Splash"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B12]/60 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 md:left-12">
                <div className="flex gap-1 mb-2">
                  {[...Array(light_cone.rarity)].map((_, i) => (
                    <span key={i} className="text-[#E5C57F] text-xs md:text-sm drop-shadow-[0_0_8px_rgba(229,197,127,0.8)]">★</span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-3xl font-bold text-white uppercase tracking-[0.1em] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  {light_cone.name}
                </h2>
              </div>
            </div>

            {/* Information Section */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-[#E5C57F] text-[10px] tracking-[0.4em] uppercase font-bold mb-4 flex items-center gap-4">
                    <span>Ability Record</span>
                    <div className="flex-1 h-[1px] bg-[#E5C57F]/20" />
                  </h3>
                  <p className="text-gray-300 text-sm md:text-md leading-relaxed font-light text-pretty whitespace-pre-line">
                    {light_cone.description || " Intelligence data not found in the archive."}
                  </p>
                </div>
              </div>

              <div className="md:w-[240px] space-y-4">
                <div className="bg-white/[0.03] border border-[#E5C57F]/20 p-6 rounded-sm relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E5C57F" strokeWidth="1"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] block mb-2">Rolled ATK</span>
                  <div className="text-5xl font-mono text-[#E5C57F] font-bold tracking-tighter">
                    {rolled_atk}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] text-gray-600 font-mono tracking-widest uppercase">
                    <span>Status: Verified</span>
                    <span>ID: {equippedLightCone.id.substring(0,6)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E5C57F]/40 to-transparent" />
          </div>
        </div>
      )}
    </>
  );
}