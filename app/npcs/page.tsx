// app/npcs/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default async function NpcRoster() {
  // ดึงข้อมูล NPC ทั้งหมด
  const allNpcs = await prisma.npcs.findMany({
    include: {
      paths: true,
      elements: true,
    },
    orderBy: { name: 'asc' }
  });

  // จัดกลุ่ม NPC ตาม Faction (ฝ่าย)
  const factions = Array.from(new Set(allNpcs.map(npc => npc.faction)));
  const groupedNpcs = factions.map(faction => ({
    faction_name: faction,
    members: allNpcs.filter(npc => npc.faction === faction)
  }));

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  return (
    <main 
      className="min-h-screen text-gray-200 p-6 md:p-12 relative overflow-x-hidden"
      style={{ ...themeStyles, backgroundColor: '#0B0B12' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        @keyframes textGlow {
          0%, 100% { opacity: 0.8; text-shadow: 0 0 5px rgba(229, 197, 127, 0.2); }
          50% { opacity: 1; text-shadow: 0 0 15px rgba(229, 197, 127, 0.6); }
        }
        .animate-text-glow { animation: textGlow 4s ease-in-out infinite; }
      `}} />

      {/* Header - ให้สไลด์ขึ้นมาอันดับแรก */}
      <div 
        className="max-w-7xl mx-auto mb-12 stagger-up"
        style={{ '--delay': '0.1s' } as React.CSSProperties}
      >
        <Link href="/" className="text-[#E5C57F] hover:underline text-sm tracking-widest mb-4 inline-block">
          ← BACK TO ARCHIVE
        </Link>
        <h1 className="text-4xl font-light tracking-[0.3em] uppercase animate-text-glow">
          Persons of <span className="font-bold text-[#E5C57F]">Interest</span>
        </h1>
        <div className="h-[1px] w-full mt-4" style={{ background: 'linear-gradient(to right, var(--hsr-gold), transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {groupedNpcs.length === 0 && (
           <p className="text-gray-500 tracking-widest uppercase italic stagger-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
             No Data Available in Astral Express Logistics.
           </p>
        )}

        {/* แสดงผลแยกตาม Faction และให้ทยอยสไลด์ขึ้นมาทีละกลุ่ม */}
        {groupedNpcs.map((group, index) => (
          <section 
            key={group.faction_name}
            className="stagger-up"
            style={{ '--delay': `${0.2 + (index * 0.1)}s` } as React.CSSProperties}
          >
            <div className="flex items-center gap-4 mb-8 border-b pb-4" style={{ borderColor: 'var(--hsr-border)' }}>
              {/* ตกแต่งหัวข้อ Faction นิดหน่อย */}
              <div className="w-2 h-8 bg-white/20" />
              <h2 className="text-2xl font-bold tracking-widest uppercase text-white">{group.faction_name}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {group.members.map(npc => (
                <NpcCard key={npc.id} data={npc} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

// ================= COMPONENT: NPC CARD =================
function NpcCard({ data }: { data: any }) {
  return (
    <Link 
      href={`/npcs/${data.id}`}
      className="group relative aspect-[3/4] rounded-sm overflow-hidden border transition-all duration-500 hover:scale-105 shadow-xl block grayscale-[20%] hover:grayscale-0"
      style={{ borderColor: 'var(--hsr-border)', backgroundColor: '#14141C' }}
    >
      {/* ภาพโปรไฟล์ NPC */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${data.profile_img || 'https://iili.io/your_placeholder.png'})`, opacity: 0.8 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

      {/* ถ้ามี Path หรือ Element ถึงจะโชว์ */}
      <div className="absolute top-2 left-2 flex gap-2 z-20">
        {data.elements?.icon_url && (
          <img src={data.elements.icon_url} alt="Element" className="w-6 h-6 object-contain filter drop-shadow-[0_0_3px_black]" />
        )}
        {data.paths?.icon_url && (
          <img src={data.paths.icon_url} alt="Path" className="w-6 h-6 object-contain filter drop-shadow-[0_0_3px_black]" />
        )}
      </div>

      {/* ชื่อและ Faction ด้านล่าง */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <p className="text-white font-bold text-sm truncate drop-shadow-lg">{data.name}</p>
        <p className="text-[10px] text-gray-400 tracking-wider truncate uppercase opacity-80">
          {data.faction}
        </p>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E5C57F]/40 transition-all duration-500 pointer-events-none" />
    </Link>
  );
}