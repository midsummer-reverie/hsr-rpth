"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClueBoard({ clues, showAllButton = false, showFilter = false }: { clues: any[], showAllButton?: boolean, showFilter?: boolean }) {
  const [selectedClue, setSelectedClue] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  
  // State ใหม่สำหรับควบคุมแอนิเมชันตอนปิด
  const [isClosing, setIsClosing] = useState(false);

  // ลบ useEffect ที่บล็อกการ Scroll ออกไปเลยครับ หน้าเว็บหลักจะได้เลื่อนได้ตามปกติ

  const formatId = (id: number) => String(id).padStart(3, '0');

  const getCategory = (rawType: string) => {
    if (!rawType) return "OTHER";
    const typeKey = rawType.toUpperCase().trim();
    if (['DOCUMENT', 'หนังสือและเอกสาร', 'หนังสือ', 'เอกสาร'].includes(typeKey)) return 'DOCUMENT';
    if (['TESTIMONY', 'คำบอกเล่า'].includes(typeKey)) return 'TESTIMONY';
    if (['ITEM', 'สิ่งของ'].includes(typeKey)) return 'ITEM';
    if (['OBSERVATION', 'จุดสังเกตในสถานที่', 'จุดสังเกต', 'สถานที่'].includes(typeKey)) return 'OBSERVATION';
    return "OTHER";
  };

  const formatType = (rawType: string) => {
    const category = getCategory(rawType);
    if (category === 'DOCUMENT') return 'DOCUMENT • หนังสือและเอกสาร';
    if (category === 'TESTIMONY') return 'TESTIMONY • คำบอกเล่า';
    if (category === 'ITEM') return 'ITEM • สิ่งของ';
    if (category === 'OBSERVATION') return 'OBSERVATION • จุดสังเกตในสถานที่';
    return rawType; 
  };

  const filteredClues = activeFilter === 'ALL' 
    ? clues 
    : clues.filter(clue => getCategory(clue.type) === activeFilter);

  // ฟังก์ชันสำหรับปิด Pop-up พร้อมแอนิเมชัน
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedClue(null);
      setIsClosing(false);
    }, 300); // รอ 300ms ให้แอนิเมชันเล่นจบก่อนค่อยปิดจริง
  };

  return (
    <div className="relative w-full" style={{ fontFamily: '"Google Sans", sans-serif' }}>
      
      {/* ใส่ Style สำหรับ Scrollbar และ Animation Fade Out */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        .clue-modal-content * {
          font-family: "Google Sans", sans-serif !important;
        }
        
        .hsr-scrollbar::-webkit-scrollbar { width: 6px; }
        .hsr-scrollbar::-webkit-scrollbar-track { background: rgba(11, 11, 18, 0.5); border-radius: 10px; }
        .hsr-scrollbar::-webkit-scrollbar-thumb { background: rgba(229, 197, 127, 0.3); border-radius: 10px; }
        .hsr-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(229, 197, 127, 0.7); }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* 👇 แอนิเมชันตอนปิด (Fade Out และเลื่อนลงนิดๆ) 👇 */
        @keyframes fadeOutDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(10px); }
        }
      `}} />

      {/* Header ของเบาะแส */}
      <div className="flex items-end justify-between mb-6 border-b pb-2" style={{ borderColor: 'var(--hsr-border)' }}>
        <h2 className="text-xl font-light tracking-widest text-white uppercase" style={{ textShadow: '0 0 10px rgba(229,197,127,0.3)' }}>
          INVESTIGATION <span style={{ color: 'var(--hsr-gold)' }}>CLUES</span>
        </h2>
        
        {showAllButton ? (
          <Link 
            href="/clues" 
            className="text-xs tracking-widest text-[#E5C57F] hover:text-white transition-colors border border-[#E5C57F]/30 px-4 py-1.5 rounded-sm hover:bg-[#E5C57F]/10 flex items-center gap-2"
          >
            VIEW ALL ARCHIVES <span className="text-[10px]">➔</span>
          </Link>
        ) : (
          <span className="text-xs tracking-widest text-[#E5C57F] animate-pulse">DATABASE: ACTIVE</span>
        )}
      </div>

      {/* แถบปุ่มกดตัวกรอง */}
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-6">
          {['ALL', 'DOCUMENT', 'TESTIMONY', 'ITEM', 'OBSERVATION'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 border rounded-sm ${
                activeFilter === cat 
                  ? 'bg-[#E5C57F] text-black border-[#E5C57F] shadow-[0_0_10px_rgba(229,197,127,0.4)]' 
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-[#E5C57F]/50 hover:text-gray-200'
              }`}
            >
              {cat === 'ALL' ? 'ALL ARCHIVES' : cat}
            </button>
          ))}
        </div>
      )}

      {/* กระดานเบาะแส */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[200px]">
        {filteredClues.map((clue, index) => {
          const numId = formatId(clue.id);
          const bilingualType = formatType(clue.type); 

          return (
            <div 
              key={clue.id} 
              onClick={() => setSelectedClue(clue)}
              className="group relative p-5 flex flex-col gap-2 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(229,197,127,0.15)] h-fit"
              style={{ 
                backgroundColor: 'var(--hsr-panel-bg)', 
                border: '1px solid var(--hsr-border)',
                animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: `${0.1 + (index * 0.05)}s`,
                opacity: 0
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E5C57F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors">CLUE-{numId}</span>
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm ${clue.status === 'CRITICAL' || clue.status === 'INVESTIGATING' ? 'bg-red-900/50 text-red-400' : 'bg-[#E5C57F]/10 text-[#E5C57F]'}`}>
                  {clue.status}
                </span>
              </div>
              
              <p className="text-base font-medium text-gray-200 mt-1 group-hover:text-white transition-colors z-10">{clue.title}</p>
              <p className="text-xs text-gray-500 mt-2 z-10 uppercase">TYPE: {bilingualType}</p>

              <div className="absolute right-[-10px] bottom-[-20px] text-[100px] font-black opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none select-none text-white tracking-tighter">
                {numId}
              </div>
            </div>
          );
        })}
        {filteredClues.length === 0 && (
          <p className="text-sm text-gray-500 tracking-widest italic col-span-2 py-10 text-center animate-pulse">
            No specific clues found in this category.
          </p>
        )}
      </div>

      {/* ================= POP-UP เบาะแส (Modal) ================= */}
      {selectedClue && (
        <div className={`fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-16 md:pt-24 clue-modal-content transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* พื้นหลังดำเบลอ (กดแล้วเรียกฟังก์ชัน handleCloseModal แทน) */}
          <div 
            className="absolute inset-0 bg-[#0B0B12]/80 backdrop-blur-md cursor-pointer z-0" 
            onClick={handleCloseModal}
          />
          
          {/* ตัวการ์ด Pop-up (เพิ่มเงื่อนไขการเล่นแอนิเมชันตอนเปิด/ปิด) */}
          <div 
            className="relative z-10 w-full max-w-2xl border p-6 md:p-8 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[80vh]" 
            style={{ 
              backgroundColor: '#0B0B12', 
              borderColor: 'var(--hsr-gold)',
              animation: isClosing ? 'fadeOutDown 0.3s ease-in forwards' : 'slideInUp 0.3s ease-out forwards'
            }}
          >
            {/* ปุ่มปิด */}
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-[#E5C57F] transition-colors z-20 bg-[#0B0B12] rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="border-b pb-4 mb-4 shrink-0" style={{ borderColor: 'var(--hsr-border)' }}>
              <span className="text-xs tracking-widest text-[#E5C57F] mb-2 block uppercase">{formatType(selectedClue.type)} • CLUE-{formatId(selectedClue.id)}</span>
              <h3 className="text-2xl text-white font-light tracking-wide pr-8">{selectedClue.title}</h3>
              {selectedClue.discoverer && (
                <p className="text-[11px] text-gray-400 mt-3 tracking-widest uppercase">
                  Discovered by: <span className="text-[#E5C57F] font-bold">{selectedClue.discoverer}</span>
                </p>
              )}
            </div>

            <div className="overflow-y-auto hsr-scrollbar pr-4 flex-1 min-h-0 text-gray-300 leading-relaxed font-light tracking-wide space-y-4">
              {selectedClue.image_url && (
                <div className="rounded-sm overflow-hidden border border-[#E5C57F]/20 bg-black/50 flex justify-center mb-4">
                  <img src={selectedClue.image_url} alt="Clue Evidence" className="max-w-full object-contain max-h-[250px]" />
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: selectedClue.details }} />
            </div>

            <div className="mt-4 pt-4 flex items-center justify-between shrink-0 border-t" style={{ borderColor: 'rgba(229, 197, 127, 0.1)' }}>
              <div className="w-full h-[1px] opacity-30" style={{ background: 'linear-gradient(to right, var(--hsr-gold), transparent)' }} />
              <span className="text-[10px] text-gray-500 tracking-widest pl-4 whitespace-nowrap">END OF RECORD</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}