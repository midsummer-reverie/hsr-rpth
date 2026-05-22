// app/admin/database/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// กำหนดโครงสร้างข้อมูลเริ่มต้นเพื่อง่ายต่อการ Clear Form
const defaultFormData = {
  id: '', name: '', faction: '', profile_img: '', splash_img: '', path_id: '', element_id: '',
  story_1: '', is_story_1_locked: false,
  story_2: '', is_story_2_locked: true,
  story_3: '', is_story_3_locked: true,
  story_4: '', is_story_4_locked: true,
  story_5: '', is_story_5_locked: true,
};

export default function DatabaseManagement() {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [npcList, setNpcList] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });
  const [formData, setFormData] = useState(defaultFormData);

  // ดึงรายชื่อ NPC เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    fetch('/api/npcs')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setNpcList(data);
      })
      .catch(err => console.error("Failed to fetch NPCs", err));
  }, []);

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--hsr-panel-bg': 'rgba(20, 20, 28, 0.6)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  // ฟังก์ชันเมื่อเปลี่ยน Dropdown
  const handleNpcSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setFormData(defaultFormData);
      return;
    }
    const npc = npcList.find(n => n.id.toString() === selectedId);
    if (npc) {
      // เอาข้อมูลเก่ามาใส่ฟอร์ม (แปลง null เป็นค่าว่าง ป้องกัน error)
      setFormData({
        id: npc.id.toString(),
        name: npc.name || '', faction: npc.faction || '',
        profile_img: npc.profile_img || '', splash_img: npc.splash_img || '',
        path_id: npc.path_id ? npc.path_id.toString() : '',
        element_id: npc.element_id ? npc.element_id.toString() : '',
        story_1: npc.story_1 || '', is_story_1_locked: npc.is_story_1_locked || false,
        story_2: npc.story_2 || '', is_story_2_locked: npc.is_story_2_locked || false,
        story_3: npc.story_3 || '', is_story_3_locked: npc.is_story_3_locked || false,
        story_4: npc.story_4 || '', is_story_4_locked: npc.is_story_4_locked || false,
        story_5: npc.story_5 || '', is_story_5_locked: npc.is_story_5_locked || false,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && !formData.id) {
      setStatusMessage({ text: '❌ กรุณาเลือก NPC ที่ต้องการแก้ไขจาก Dropdown', isError: true });
      return;
    }

    setStatusMessage({ text: 'กำลังบันทึกข้อมูลเข้าสู่ระบบ...', isError: false });

    try {
      const res = await fetch('/api/npcs', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage({ text: mode === 'create' ? '✔️ บันทึกข้อมูล NPC ใหม่สำเร็จ!' : '✔️ อัปเดตข้อมูล NPC สำเร็จ!', isError: false });
        
        // ถ้าเป็นการสร้างใหม่ ให้โหลดรายชื่อ NPC ใหม่มาเก็บไว้ใน Dropdown ด้วย
        if (mode === 'create') {
           const updatedList = await fetch('/api/npcs').then(r => r.json());
           setNpcList(updatedList);
           setFormData(defaultFormData); // เคลียร์ฟอร์ม
        }
      } else {
        throw new Error('Server Error');
      }
    } catch (err) {
      setStatusMessage({ text: '❌ ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบข้อมูลอีกครั้ง', isError: true });
    }
  };

  return (
    <main 
      className="min-h-screen text-gray-200 p-6 md:p-12 relative overflow-x-hidden"
      style={{ ...themeStyles, backgroundColor: '#07070A' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
      `}} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#E5C57F]/20 pb-6 stagger-up" style={{ '--delay': '0.1s' } as React.CSSProperties}>
          <div>
            <Link href="/admin/dashboard" className="text-[#E5C57F] text-xs tracking-widest uppercase hover:underline mb-2 block">
              ← BACK TO PORTAL
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter text-white uppercase">Data <span className="text-[#E5C57F]">Registration</span></h1>
          </div>
          <div className="flex bg-black/40 border border-[#E5C57F]/30 rounded-sm overflow-hidden p-1">
             <button 
                type="button"
                onClick={() => { setMode('create'); setFormData(defaultFormData); setStatusMessage({text:'', isError:false}); }}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors ${mode === 'create' ? 'bg-[#E5C57F] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
             >
                Create New
             </button>
             <button 
                type="button"
                onClick={() => { setMode('edit'); setFormData(defaultFormData); setStatusMessage({text:'', isError:false}); }}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors ${mode === 'edit' ? 'bg-[#E5C57F] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
             >
                Edit Existing
             </button>
          </div>
        </div>

        {/* Edit Mode Dropdown */}
        {mode === 'edit' && (
          <div className="mb-6 p-6 bg-white/5 border border-[#E5C57F]/30 rounded-sm stagger-up" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            <label className="block text-xs font-bold text-[#E5C57F] uppercase tracking-widest mb-3">Target Entity Selection</label>
            <select 
              value={formData.id} 
              onChange={handleNpcSelect}
              className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[#E5C57F] appearance-none"
            >
              <option value="">-- เลือก NPC ที่ต้องการแก้ไข --</option>
              {npcList.map(npc => (
                <option key={npc.id} value={npc.id}>{npc.name} ({npc.faction})</option>
              ))}
            </select>
          </div>
        )}

        {/* Status Alert Box */}
        {statusMessage.text && (
          <div className={`p-4 mb-6 rounded-sm text-sm tracking-wide border stagger-up ${statusMessage.isError ? 'bg-red-900/20 border-red-500/30 text-red-400' : 'bg-[#E5C57F]/10 border-[#E5C57F]/30 text-[#E5C57F]'}`}>
            {statusMessage.text}
          </div>
        )}

        {/* Form Console */}
        <form onSubmit={handleSubmit} className="space-y-10 stagger-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
          
          {/* SECTION 1: Core Profile */}
          <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-sm space-y-6">
            <h3 className="text-sm font-bold tracking-[0.2em] text-[#E5C57F] uppercase border-l-2 border-[#E5C57F] pl-3">General Intelligence</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">NPC Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 text-white outline-none focus:border-[#E5C57F]" placeholder="เช่น Dan Heng" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Faction (ฝ่าย) *</label>
                <input required type="text" value={formData.faction} onChange={e => setFormData({...formData, faction: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 text-white outline-none focus:border-[#E5C57F]" placeholder="เช่น Astral Express" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Profile Image URL</label>
                <input type="url" value={formData.profile_img} onChange={e => setFormData({...formData, profile_img: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 text-white outline-none focus:border-[#E5C57F]" placeholder="https://iili.io/..." />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Splash Art URL</label>
                <input type="url" value={formData.splash_img} onChange={e => setFormData({...formData, splash_img: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 text-white outline-none focus:border-[#E5C57F]" placeholder="https://iili.io/..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Path ID (เว้นว่างได้)</label>
                <input type="number" value={formData.path_id} onChange={e => setFormData({...formData, path_id: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 text-white font-mono outline-none focus:border-[#E5C57F]" placeholder="เช่น 1" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Element ID (เว้นว่างได้)</label>
                <input type="number" value={formData.element_id} onChange={e => setFormData({...formData, element_id: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 text-white font-mono outline-none focus:border-[#E5C57F]" placeholder="เช่น 1" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Personnel Records (5 Parts Story) */}
          <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-sm space-y-8">
            <h3 className="text-sm font-bold tracking-[0.2em] text-[#E5C57F] uppercase border-l-2 border-[#E5C57F] pl-3">Personnel Records (Story Fragments)</h3>
            
            {[1, 2, 3, 4, 5].map((part) => (
              <div key={part} className="space-y-3 border-l border-white/10 pl-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold tracking-widest text-gray-300 uppercase">Fragment {part}</label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
                    <input 
                      type="checkbox" 
                      checked={(formData as any)[`is_story_${part}_locked`]} 
                      onChange={e => setFormData({...formData, [`is_story_${part}_locked`]: e.target.checked})}
                      className="accent-[#E5C57F]"
                    />
                    <span className={(formData as any)[`is_story_${part}_locked`] ? 'text-red-400' : 'text-green-400'}>
                      {(formData as any)[`is_story_${part}_locked`] ? '🔒 Locked' : '🔓 Unlocked'}
                    </span>
                  </label>
                </div>
                <textarea 
                  value={(formData as any)[`story_${part}`]} 
                  onChange={e => setFormData({...formData, [`story_${part}`]: e.target.value})}
                  rows={3} 
                  className="w-full bg-black/40 border border-white/10 p-4 text-sm text-gray-200 outline-none focus:border-[#E5C57F] resize-y custom-scrollbar"
                  placeholder={`ระบุเนื้อเรื่องส่วนที่ ${part}`}
                />
              </div>
            ))}
          </div>

          {/* Submit Action */}
          <div className="flex justify-end gap-4">
            <Link href="/admin/dashboard" className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase flex items-center">
              Cancel
            </Link>
            <button type="submit" className="bg-[#E5C57F] hover:bg-white text-black font-bold px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors rounded-sm shadow-lg">
              {mode === 'create' ? 'Register New Entity' : 'Update Entity Data'}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}