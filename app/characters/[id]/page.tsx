// app/characters/[id]/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LightConeSlot from '../../components/LightConeSlot'; 
import RelicSlot from '../../components/RelicSlot';

export const dynamic = 'force-dynamic';
export default async function CharacterDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const uid = parseInt(resolvedParams.id);

  const user = await prisma.users.findUnique({
    where: { uid: uid },
    include: {
      paths: true,
      elements: true,
    }
  });

  if (!user) notFound();

  // 1. ดึงข้อมูล Light Cone ที่สวมใส่
  const equippedLightCone = await prisma.player_light_cones.findFirst({
    where: {
      equipped_to: uid,
      is_equipped: true
    },
    include: {
      light_cone: true
    }
  });

  // 2. ดึงข้อมูล Relics ที่สวมใส่
  const equippedRelics = await prisma.player_relics.findMany({
    where: {
      equipped_to: uid,
      is_equipped: true
    },
    include: {
      relic: true
    }
  });

  // 3. แยก Relics ตามประเภทชิ้นส่วน
  const headRelic = equippedRelics.find(r => r.relic.piece_type === 'HEAD');
  const handsRelic = equippedRelics.find(r => r.relic.piece_type === 'HANDS');
  const bodyRelic = equippedRelics.find(r => r.relic.piece_type === 'BODY');
  const sphereRelic = equippedRelics.find(r => r.relic.piece_type === 'SPHERE');

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--hsr-panel-bg': 'rgba(15, 15, 22, 0.85)',
    '--icon-mask-url': 'url("https://iili.io/C9Q7TgI.png")',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  return (
    <main 
      className="min-h-screen text-gray-200 relative overflow-hidden flex flex-col md:flex-row"
      style={{ ...themeStyles, backgroundColor: '#07070A' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        
        .stat-bar-bg { background: linear-gradient(90deg, rgba(229, 197, 127, 0.1) 0%, transparent 100%); }
        .stat-value-glow { text-shadow: 0 0 10px rgba(229, 197, 127, 0.5); }
      `}} />

      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E5C57F] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* ================= LEFT SIDE: Character Splash Art ================= */}
      <section 
        className="relative w-full md:w-[40%] h-[50vh] md:h-screen flex items-center justify-center p-8 stagger-left"
        style={{ '--delay': '0.1s' } as React.CSSProperties}
      >
        <Link href="/characters" className="absolute top-8 left-8 z-30 text-[#E5C57F] hover:underline tracking-widest text-sm drop-shadow-md">
          ← BACK TO ROSTER
        </Link>
        
        <div className="relative w-full max-w-sm aspect-[2/3] group rounded-md overflow-hidden border border-[#E5C57F]/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/20">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
                 <div className="w-[120%] aspect-square border border-[#E5C57F]/30 rounded-full" />
            </div>

            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 opacity-90 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${user.splash_img || 'https://iili.io/your_placeholder_big.png'}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

            {user.paths?.icon_url && (
                <div 
                    className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none"
                    style={{
                        backgroundColor: '#E5C57F',
                        maskImage: `url(${user.paths.icon_url})`,
                        WebkitMaskImage: `url(${user.paths.icon_url})`,
                        maskSize: '150%',
                        WebkitMaskSize: '150%',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center 20%',
                        WebkitMaskPosition: 'center 20%',
                    }}
                />
            )}
        </div>
      </section>

      {/* ================= RIGHT SIDE: Data Panel ================= */}
      <section 
        className="w-full md:w-[60%] min-h-screen overflow-y-auto p-8 md:p-16 z-20 custom-scrollbar border-l border-[#E5C57F]/10 stagger-right"
        style={{ backgroundColor: 'var(--hsr-panel-bg)', '--delay': '0.2s' } as React.CSSProperties}
      >
        
        {/* HEADER */}
        <div className="mb-10 stagger-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-1 uppercase">{user.char_name}</h1>
            <p className="text-xl text-gray-400 font-light tracking-widest uppercase">{user.display_name || user.discord_id.toString()}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 px-5 bg-white/5 border-l-2 border-[#E5C57F] w-fit">
                    {user.paths?.icon_url && (
                        <img src={user.paths.icon_url} className="w-6 h-6 object-contain" alt="Path" />
                    )}
                    <span className="text-sm tracking-[0.2em] text-[#E5C57F] uppercase font-bold">
                        {user.paths?.path_name || 'UNKNOWN PATH'}
                    </span>
                </div>

                <div className="flex items-center gap-3 p-3 px-5 bg-white/5 border-l-2 border-gray-400 w-fit">
                    {user.elements?.icon_url && (
                        <img src={user.elements.icon_url} className="w-6 h-6 object-contain" alt="Element" />
                    )}
                    <span className="text-sm tracking-[0.2em] text-gray-300 uppercase font-bold">
                        {user.elements?.element_name_en || 'UNKNOWN ELEMENT'}
                    </span>
                </div>
            </div>
        </div>

        {/* ATTRIBUTES */}
        <div className="mb-12 stagger-up" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            <h3 className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6 flex items-center gap-4">
                <span>Attributes</span>
                <div className="flex-1 h-[1px] bg-white/10" />
            </h3>
            
            <div className="grid gap-3 max-w-2xl">
                <StatRow label="HP" base={user.base_hp} sum={user.sum_hp} />
                <StatRow label="ATK" base={user.base_atk} sum={user.sum_atk} />
                <StatRow label="DEF" base={user.base_def} sum={user.sum_def} />
            </div>
        </div>

        {/* EQUIPMENT */}
        <div className="stagger-up" style={{ '--delay': '0.5s' } as React.CSSProperties}>
            <h3 className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-6 flex items-center gap-4">
                <span>Equipment</span>
                <div className="flex-1 h-[1px] bg-white/10" />
            </h3>

            <div className="flex flex-col xl:flex-row gap-8 max-w-4xl">
                
                {/* Light Cone Area */}
                <div className="flex flex-col gap-3 shrink-0">
                    <span className="text-[10px] tracking-[0.2em] text-[#E5C57F] uppercase font-bold text-center xl:text-left">Light Cone</span>
                    <LightConeSlot equippedLightCone={equippedLightCone} />
                </div>

                {/* เส้นคั่น */}
                <div className="hidden xl:block w-[1px] bg-white/10 my-6" />

                {/* Relics Area */}
                <div className="flex flex-col gap-3 flex-1">
                    <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-bold text-center xl:text-left">Relic Inventory</span>
                    
                    <div className="flex-1 flex items-center">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
                            <RelicSlot pieceType="HEAD" typeLabel="Head" relicInstance={headRelic} />
                            <RelicSlot pieceType="HANDS" typeLabel="Hands" relicInstance={handsRelic} />
                            <RelicSlot pieceType="BODY" typeLabel="Body" relicInstance={bodyRelic} />
                            <RelicSlot pieceType="SPHERE" typeLabel="Sphere" relicInstance={sphereRelic} />
                        </div>
                    </div>
                </div>

            </div>
            
            <p className="text-[10px] text-gray-600 mt-10 italic">* Equipment data synchronized with Astral Express Logistics</p>
        </div>

      </section>
    </main>
  );
}

// Helper Component
function StatRow({ label, base, sum }: { label: string, base: any, sum: any }) {
  const baseVal = base ?? 0;
  const sumVal = sum ?? baseVal;

  return (
    <div className="stat-bar-bg p-4 border-l-2 border-white/5 flex justify-between items-center group hover:bg-white/5 transition-colors">
        <span className="text-gray-400 tracking-widest text-sm">{label}</span>
        <div className="text-right">
            <span className="text-white font-bold text-xl stat-value-glow">{sumVal}</span>
        </div>
    </div>
  );
}