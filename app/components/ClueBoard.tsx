"use client";
import { useState } from 'react';
import Link from 'next/link';

// เพิ่ม showFilter เข้ามาเป็น Prop อีกตัวครับ
export default function ClueBoard({ clues, showAllButton = false, showFilter = false }: { clues: any[], showAllButton?: boolean, showFilter?: boolean }) {
  const [selectedClue, setSelectedClue] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL'); // State เก็บค่าตัวกรอง

  // ฟังก์ชันแปลงเลข ID ให้เป็น 001, 002
  const formatId = (id: number) => String(id).padStart(3, '0');

  // ฟังก์ชันจัดกลุ่มประเภท (ใช้สำหรับกรองข้อมูล)
  const getCategory = (rawType: string) => {
    if (!rawType) return "OTHER";
    const typeKey = rawType.toUpperCase().trim();
    if (['DOCUMENT', 'หนังสือและเอกสาร', 'หนังสือ', 'เอกสาร'].includes(typeKey)) return 'DOCUMENT';
    if (['TESTIMONY', 'คำบอกเล่า'].includes(typeKey)) return 'TESTIMONY';
    if (['ITEM', 'สิ่งของ'].includes(typeKey)) return 'ITEM';
    if (['OBSERVATION', 'จุดสังเกตในสถานที่', 'จุดสังเกต', 'สถานที่'].includes(typeKey)) return 'OBSERVATION';
    return "OTHER";
  };

  // ฟังก์ชันแปลงประเภทเบาะแสให้เป็น 2 ภาษาสำหรับแสดงผล
  const formatType = (rawType: string) => {
    const category = getCategory(rawType);
    if (category === 'DOCUMENT') return 'DOCUMENT • หนังสือและเอกสาร';
    if (category === 'TESTIMONY') return 'TESTIMONY • คำบอกเล่า';
    if (category === 'ITEM') return 'ITEM • สิ่งของ';
    if (category === 'OBSERVATION') return 'OBSERVATION • จุดสังเกตในสถานที่';
    return rawType; // ถ้าไม่เข้าข่ายให้โชว์ข้อความเดิม
  };

  // กรองข้อมูลเบาะแสตามปุ่มที่กดเลือก
  const filteredClues = activeFilter === 'ALL' 
    ? clues 
    : clues.filter(clue => getCategory(clue.type) === activeFilter);

  return (
    <div className="relative w-full">
      {/* Header ของเบาะแส */}
      <div className="flex items-end justify-between mb-6 border-b pb-2" style={{ borderColor: 'var(--hsr-border)' }}>
        <h2 className="text-xl font-light tracking-widest text-white uppercase" style={{ textShadow: '0 0 10px rgba(229,197,127,0.3)' }}>
          INVESTIGATION <span style={{ color: 'var(--hsr-gold)' }}>CLUES</span>
        </h2>
        
        {/* สลับปุ่มระหว่าง 'ดูทั้งหมด' กับ 'สถานะ Database' */}
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

      {/* ================= แถบปุ่มกดตัวกรอง (Filter) ================= */}
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

      {/* กระดานเบาะแส (ใช้ filteredClues แทน clues เดิม) */}
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
                <span className="text-[10px] font-mono tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors">CLUE-{numId}</span>
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm ${clue.status === 'CRITICAL' || clue.status === 'INVESTIGATING' ? 'bg-red-900/50 text-red-400' : 'bg-[#E5C57F]/10 text-[#E5C57F]'}`}>
                  {clue.status}
                </span>
              </div>
              
              <p className="text-base font-medium text-gray-200 mt-1 group-hover:text-white transition-colors z-10">{clue.title}</p>
              <p className="text-xs text-gray-500 font-mono mt-2 z-10">TYPE: {bilingualType}</p>

              {/* ลายน้ำตัวเลข ID ขนาดใหญ่ */}
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedClue(null)}></div>
          
          <div className="relative w-full max-w-2xl border p-6 md:p-10 rounded-sm shadow-2xl animate-[slideInUp_0.3s_ease-out] max-h-[90vh] overflow-y-auto custom-scrollbar" style={{ backgroundColor: '#0B0B12', borderColor: 'var(--hsr-gold)' }}>
            <button onClick={() => setSelectedClue(null)} className="absolute top-4 right-4 text-gray-500 hover:text-[#E5C57F] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="border-b pb-4 mb-6" style={{ borderColor: 'var(--hsr-border)' }}>
              <span className="text-xs tracking-widest text-[#E5C57F] mb-2 block uppercase">{formatType(selectedClue.type)} • CLUE-{formatId(selectedClue.id)}</span>
              <h3 className="text-2xl text-white font-light tracking-wide">{selectedClue.title}</h3>
              {selectedClue.discoverer && (
                <p className="text-[11px] text-gray-400 mt-3 tracking-widest uppercase">
                  Discovered by: <span className="text-[#E5C57F] font-bold">{selectedClue.discoverer}</span>
                </p>
              )}
            </div>

            <div className="text-gray-300 leading-relaxed font-light tracking-wide min-h-[100px]">
              {selectedClue.image_url && (
                <div className="mb-6 rounded-sm overflow-hidden border border-[#E5C57F]/20">
                  <img src={selectedClue.image_url} alt="Clue Evidence" className="w-full object-contain max-h-[300px]" />
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: selectedClue.details }} />
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="w-full h-[1px] opacity-30" style={{ background: 'linear-gradient(to right, var(--hsr-gold), transparent)' }} />
              <span className="text-[10px] text-gray-500 tracking-widest pl-4 whitespace-nowrap">END OF RECORD</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}