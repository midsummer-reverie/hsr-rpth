// app/components/RelicSlot.tsx
'use client';

import { useState, useEffect } from 'react';

interface RelicSlotProps {
  relicInstance?: any;
  typeLabel: string;
  pieceType: string;
}

export default function RelicSlot({ relicInstance, typeLabel, pieceType }: RelicSlotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
    else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // แสดงผลหน่วยของสเตตัสตามประเภท
  const getStatLabel = (type: string) => {
    switch (type) {
      case 'HEAD': return 'HP';
      case 'HANDS': return 'ATK';
      case 'BODY': return 'DEF';
      case 'SPHERE': return 'SPECIAL EFFECT';
      default: return 'STAT';
    }
  };

  // ฟังก์ชันแทนที่ {val} และ {val2} ในคำอธิบาย
  const formatDescription = (desc: string, val: number, val2?: number) => {
    if (!desc) return "Data not found.";
    let result = desc.replace('{val}', val.toString());
    if (val2 !== undefined && val2 !== null) {
      result = result.replace('{val2}', val2.toString());
    }
    return result;
  };

  if (!relicInstance) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 bg-transparent relative group cursor-pointer transition-all flex items-center justify-center overflow-hidden border border-white/5 rounded-full">
           <span className="text-2xl font-light text-gray-700 group-hover:text-[#E5C57F] opacity-30 group-hover:opacity-100 transition-all">+</span>
        </div>
        <span className="text-[9px] text-gray-600 tracking-[0.2em] uppercase">{typeLabel}</span>
      </div>
    );
  }

  const { relic, rolled_stat, rolled_stat_2 } = relicInstance;

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

      {/* 1. Icon ในหน้าตัวละคร (วงกลมคลีนๆ) */}
      <div className="flex flex-col items-center gap-2">
        <div 
          onClick={() => setIsOpen(true)}
          className="w-24 h-24 relative cursor-pointer group bg-transparent overflow-hidden rounded-full border border-white/10 hover:border-[#E5C57F]/50 transition-all duration-500"
        >
          <img 
            src={relic.image_url || 'https://iili.io/C9QECvV.png'} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            alt={relic.name}
          />
        </div>
        <span className="text-[9px] text-[#E5C57F] tracking-[0.2em] uppercase font-bold">{typeLabel}</span>
      </div>

      {/* 2. Modal รายละเอียด Relic แบบมี Icon ใหญ่ */}
      {shouldRender && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${isOpen ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/90 cursor-pointer ${isOpen ? 'animate-overlay' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
          
          <div className={`relative w-full max-w-3xl bg-[#0B0B12] border border-[#E5C57F]/30 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] ${isOpen ? 'animate-modal' : 'opacity-0'}`}>
            
            {/* ปุ่มปิด [X] */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[110] text-[#E5C57F]/60 hover:text-[#E5C57F] hover:scale-110 transition-all p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Header Section: Icon & Name */}
            <div className="relative w-full p-8 md:p-10 border-b border-[#E5C57F]/10 flex flex-col md:flex-row items-center md:items-start gap-8 bg-gradient-to-br from-[#12121A] to-[#07070A]">
              
              {/* Relic Icon (เน้นกรอบวงกลมแบบในเกม) */}
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative bg-black/60 rounded-full border border-white/5 shadow-[0_0_30px_rgba(229,197,127,0.1)] flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                 <img 
                   src={relic.image_url || 'https://iili.io/your_placeholder.png'} 
                   className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" 
                   alt="Relic Icon" 
                 />
              </div>

              {/* Title & Set Name */}
              <div className="flex flex-col justify-center text-center md:text-left mt-4 md:mt-6">
                <div className="text-[#E5C57F] text-xs mb-3 flex items-center justify-center md:justify-start gap-3 tracking-widest uppercase">
                  <span>{'★'.repeat(relic.rarity)}</span>
                  <span className="text-gray-600">|</span>
                  <span className="font-bold">{relic.set_name}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest drop-shadow-md">
                  {relic.name}
                </h2>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10 bg-[#0B0B12]">
              <div className="flex-1">
                <h3 className="text-[#E5C57F] text-[10px] tracking-[0.4em] uppercase font-bold mb-4 flex items-center gap-4">
                    <span>Relic Effect</span>
                    <div className="flex-1 h-[1px] bg-[#E5C57F]/20" />
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light text-pretty">
                  {relic.piece_type === 'SPHERE' 
                    ? formatDescription(relic.effect_desc, rolled_stat, rolled_stat_2)
                    : relic.description || "Intelligence data not found in the archive."}
                </p>
              </div>

              {/* Stat Display */}
              <div className="md:w-[220px]">
                <div className="bg-white/[0.02] border border-[#E5C57F]/10 p-6 rounded-sm relative group overflow-hidden">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">
                    {getStatLabel(relic.piece_type)}
                  </span>
                  
                  {/* ค่า Stat หลัก */}
                  <div className="text-4xl font-mono text-[#E5C57F] font-bold tracking-tighter">
                    {pieceType === 'SPHERE' ? `+${rolled_stat}%` : `+${Math.floor(rolled_stat)}`}
                  </div>

                  {/* โชว์ค่า Stat ที่ 2 (ถ้ามี) */}
                  {rolled_stat_2 !== null && rolled_stat_2 !== undefined && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Sub Effect</span>
                      <div className="text-xl font-mono text-[#E5C57F]/80 font-bold tracking-tighter">
                        +{rolled_stat_2}%
                      </div>
                    </div>
                  )}

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