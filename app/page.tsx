// app/page.tsx
import Link from 'next/link';

export default function Home() {
  // กำหนด CSS Variables ธีม HSR 
  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-gold-glow': 'rgba(229, 197, 127, 0.4)',
    '--hsr-bg-dark': '#0B0B12',
    '--hsr-panel-bg': 'rgba(20, 20, 28, 0.6)',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--icon-mask-url': 'url("https://iili.io/C9Q7TgI.png")',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  // อัปเดตรายการเมนูตามที่ต้องการ
  const menuItems = [
    { id: '01', title: 'ดันเจี้ยน', subtitle: 'Cavern of Corrosion', href: '/dungeons' },
    { id: '02', title: 'สรุปอีเวนท์', subtitle: 'Astral Express Logs', href: '/events' },
    { id: '03', title: 'รายชื่อสมาชิกขบวนรถไฟ', subtitle: 'Trailblazer Roster', href: '/characters' },
    { id: '04', title: 'รายชื่อ NPC', subtitle: 'Encountered Entities', href: '/npcs' },
    { id: '05', title: 'รายชื่อศัตรู', subtitle: 'Antimatter Legion & Foes', href: '/monsters' },
    { id: '06', title: 'รายการอุปกรณ์', subtitle: 'Relics & Light Cones', href: '/equipment' },
  ];

  // ข้อมูลจำลองสำหรับ System Logs
  const systemLogs = [
    { id: 'SYS-091', type: 'UPDATE', title: 'Penacony Dreamscape Maps Synchronized', status: 'COMPLETED' },
    { id: 'SYS-092', type: 'WARNING', title: 'Stellaron Energy Fluctuation Detected', status: 'ANALYZING' },
    { id: 'SYS-093', type: 'RECORD', title: 'New Curio Registered: Fragment of an Enigma', status: 'ARCHIVED' },
    { id: 'SYS-094', type: 'NETWORK', title: 'Interastral Peace Broadcast Connection', status: 'STABLE' },
  ];

  return (
    <main 
      className="min-h-screen text-gray-200 relative overflow-hidden flex flex-col md:flex-row selection:bg-[#E5C57F] selection:text-black" 
      style={{ ...themeStyles, backgroundColor: 'var(--hsr-bg-dark)' }}
    >
      {/* แทรก Style สำหรับฟอนต์ Google Sans และ Animation ต่างๆ */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        
        @keyframes subtleFloat {
          0%, 100% { transform: translateX(0px); opacity: 0.75; text-shadow: none; }
          50% { transform: translateX(6px); opacity: 1; text-shadow: 0 0 10px rgba(229, 197, 127, 0.8); }
        }
        .animate-subtle-float {
          animation: subtleFloat 3.5s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% { opacity: 0.8; text-shadow: 0 0 4px rgba(229, 197, 127, 0.3); }
          50% { opacity: 1; text-shadow: 0 0 12px rgba(229, 197, 127, 0.7); }
        }
        .animate-text-glow {
          animation: textGlow 4s ease-in-out infinite;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
        }
      `}} />

      {/* Background Starry Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'rgba(229, 197, 127, 0.03)' }} />
      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }} />

      {/* ================= LEFT SIDEBAR (Data Bank Menu) ================= */}
      <aside className="w-full md:w-[400px] h-full flex flex-col border-b md:border-b-0 md:border-r z-10 relative" style={{ borderColor: 'var(--hsr-border)', backgroundColor: 'rgba(11, 11, 18, 0.8)' }}>
        
        {/* Header & Admin Link (สไลด์จากซ้าย) */}
        <div 
          className="p-8 border-b stagger-left" 
          style={{ borderColor: 'var(--hsr-border)', '--delay': '0.1s' } as React.CSSProperties}
        >
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl tracking-[0.2em] font-light animate-text-glow" style={{ color: 'var(--hsr-gold)' }}>
              ARCHIVE<br/><span className="font-bold">SYSTEM</span>
            </h1>
            <Link 
              href="/admin" 
              className="text-xs tracking-widest px-3 py-1 border rounded-full transition-all duration-300 hover:bg-[#E5C57F] hover:text-black"
              style={{ borderColor: 'var(--hsr-gold)', color: 'var(--hsr-gold)' }}
            >
              ADMIN
            </Link>
          </div>
          <p className="text-xs text-gray-500 tracking-widest uppercase">Version ACE 2.5 • Astral Express</p>
        </div>

        {/* Menu Items (ทยอยสไลด์จากซ้ายตามลำดับ) */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-3 custom-scrollbar">
          {menuItems.map((item, index) => (
            <Link 
              key={item.id} 
              href={item.href}
              className="group relative flex items-center p-4 rounded-sm overflow-hidden transition-all duration-500 border border-transparent hover:border-[#E5C57F]/50 stagger-left"
              style={{ 
                backgroundColor: 'var(--hsr-panel-bg)',
                '--delay': `${0.15 + (index * 0.05)}s` 
              } as React.CSSProperties}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#E5C57F] transition-colors z-10">
                <span className="font-serif italic text-lg text-gray-400 group-hover:text-[#E5C57F] transition-colors">{item.id}</span>
              </div>
              
              <div className="ml-4 z-10">
                <h2 className="text-lg tracking-wider text-gray-200 group-hover:text-white transition-colors drop-shadow-md">{item.title}</h2>
                <p className="text-[10px] tracking-widest text-gray-500 group-hover:text-[#E5C57F]/80 uppercase mt-1 transition-colors">{item.subtitle}</p>
              </div>

              {/* HSR Icon Mask Effect */}
              <div 
                className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-40 h-40 opacity-5 group-hover:opacity-20 transition-all duration-700 pointer-events-none group-hover:scale-110 group-hover:right-[-5%]"
                style={{
                  backgroundColor: 'var(--hsr-gold)',
                  maskImage: 'var(--icon-mask-url)',
                  WebkitMaskImage: 'var(--icon-mask-url)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'right center',
                  WebkitMaskPosition: 'right center',
                }}
              />
              
              <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--hsr-gold)', boxShadow: '0 0 10px var(--hsr-gold)' }} />
            </Link>
          ))}
        </div>
      </aside>

      {/* ================= RIGHT MAIN CONTENT ================= */}
      <section className="flex-1 min-h-screen overflow-y-auto p-6 md:p-10 z-10 custom-scrollbar">
        
        {/* Banner Image (สไลด์จากขวา) */}
        <div 
          className="relative w-full h-[300px] md:h-[450px] mb-10 rounded-sm p-[1px] overflow-hidden border border-[#E5C57F]/20 stagger-right"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        >
          <div className="absolute inset-[1px] bg-black overflow-hidden rounded-sm">
            <img 
              src="https://iili.io/C9QECvV.png" 
              alt="Astral Express Journey" 
              className="w-full h-full object-cover opacity-85"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/20 to-transparent" />
            
            {/* Decorative Overlay Lines with Animation */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="w-12 h-[1px]" style={{ backgroundColor: 'var(--hsr-gold)' }} />
              <p 
                className="text-sm tracking-[0.3em] uppercase animate-subtle-float" 
                style={{ color: 'var(--hsr-gold)' }}
              >
                Phase 1 : Departure
              </p>
            </div>
            
            {/* เส้นแสกน */}
            <div className="absolute inset-0 w-full h-8 bg-gradient-to-b from-transparent via-[#E5C57F]/10 to-transparent animate-scanline pointer-events-none" />
          </div>
        </div>

        {/* System Logs Section */}
        <div className="relative">
          
          {/* Header ของ Logs (ดันขึ้นมา) */}
          <div 
            className="flex items-end justify-between mb-6 border-b pb-2 stagger-up" 
            style={{ borderColor: 'var(--hsr-border)', '--delay': '0.3s' } as React.CSSProperties}
          >
            <h2 className="text-xl font-light tracking-widest text-white animate-text-glow">
              SYSTEM LOG: <span style={{ color: 'var(--hsr-gold)' }}>RECENT ENTRIES</span>
            </h2>
            <span className="text-xs tracking-widest text-[#E5C57F] animate-pulse">STATUS: ONLINE</span>
          </div>

          {/* การ์ด Log แต่ละใบ ทยอยดันขึ้นมาตามคิว */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {systemLogs.map((log, index) => (
              <div 
                key={log.id} 
                className="relative p-5 flex flex-col gap-2 overflow-hidden cursor-default stagger-up"
                style={{ 
                  backgroundColor: 'var(--hsr-panel-bg)', 
                  border: '1px solid var(--hsr-border)',
                  '--delay': `${0.4 + (index * 0.1)}s`
                } as React.CSSProperties}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400">{log.id}</span>
                  <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-sm ${log.status === 'WARNING' || log.status === 'ANALYZING' ? 'bg-red-900/50 text-red-400' : 'bg-[#E5C57F]/10 text-[#E5C57F]'}`}>
                    {log.status}
                  </span>
                </div>
                
                <p className="text-base font-medium text-gray-200 mt-1">{log.title}</p>
                <p className="text-xs text-gray-500 font-mono mt-2">CLASS: {log.type}</p>

                {/* ลายน้ำไอคอน */}
                <div 
                  className="absolute right-[-10%] bottom-[-20%] w-32 h-32 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundColor: 'white',
                    maskImage: 'var(--icon-mask-url)',
                    WebkitMaskImage: 'var(--icon-mask-url)',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}