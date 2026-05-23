"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function ClueEditorForm({ characters }: { characters: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: '',
    type: 'DOCUMENT',
    status: 'RECORDED',
    discoverer: '', // จะเก็บค่าเป็นชื่อตัวละครที่ถูกเลือก
    image_url: '',
    details: ''
  });

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ฟังก์ชันแทรก HTML Tags สำหรับจัดรูปแบบข้อความ
  const insertFormatting = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.details;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const openTag = `<${tag}>`;
    const closeTag = `</${tag}>`;

    const newText = `${before}${openTag}${selected}${closeTag}${after}`;
    
    setFormData({ ...formData, details: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, end + openTag.length);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/clues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('✅ บันทึกเบาะแสลง Archive สำเร็จ!');
        setFormData({ title: '', type: 'DOCUMENT', status: 'RECORDED', discoverer: '', image_url: '', details: '' });
      } else {
        setMessage('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      setMessage('❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen text-gray-200 p-6 md:p-12" style={{ ...themeStyles, backgroundColor: '#0B0B12' }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/dashboard" className="text-[#E5C57F] hover:underline text-sm tracking-widest mb-8 inline-block">
          ← BACK TO OVERSEER PORTAL
        </Link>
        
        <div className="mb-8 border-b pb-4" style={{ borderColor: 'var(--hsr-border)' }}>
          <h1 className="text-3xl font-light tracking-[0.2em] text-white uppercase">
            INTEL <span className="font-bold text-[#E5C57F]">ENTRY</span>
          </h1>
          <p className="text-xs text-gray-500 tracking-widest uppercase mt-2">Classified Data Addition Interface</p>
        </div>

        {message && (
          <div className={`p-4 mb-6 text-sm tracking-wider uppercase border rounded-sm ${message.includes('✅') ? 'border-green-500/50 bg-green-900/20 text-green-400' : 'border-red-500/50 bg-red-900/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 md:p-8 rounded-sm border" style={{ borderColor: 'var(--hsr-border)' }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-[10px] text-gray-400 tracking-widest uppercase mb-2">Clue Title (หัวข้อเบาะแส) *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#14141C] border text-white p-3 rounded-sm focus:outline-none focus:border-[#E5C57F] transition-colors" style={{ borderColor: 'var(--hsr-border)' }} placeholder="เช่น เศษผ้าเปื้อนคราบประหลาด" />
            </div>

            {/* Type */}
            <div>
              <label className="block text-[10px] text-gray-400 tracking-widest uppercase mb-2">Category (หมวดหมู่) *</label>
              <select required name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#14141C] border text-white p-3 rounded-sm focus:outline-none focus:border-[#E5C57F] transition-colors cursor-pointer" style={{ borderColor: 'var(--hsr-border)' }}>
                <option value="DOCUMENT">DOCUMENT (หนังสือและเอกสาร)</option>
                <option value="TESTIMONY">TESTIMONY (คำบอกเล่า)</option>
                <option value="ITEM">ITEM (สิ่งของ)</option>
                <option value="OBSERVATION">OBSERVATION (จุดสังเกตในสถานที่)</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] text-gray-400 tracking-widest uppercase mb-2">Status (สถานะ) *</label>
              <select required name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#14141C] border text-white p-3 rounded-sm focus:outline-none focus:border-[#E5C57F] transition-colors cursor-pointer" style={{ borderColor: 'var(--hsr-border)' }}>
                <option value="RECORDED">RECORDED (บันทึกแล้ว)</option>
                <option value="INVESTIGATING">INVESTIGATING (กำลังสืบสวน)</option>
                <option value="CRITICAL">CRITICAL (สำคัญมาก)</option>
                <option value="DECODING">DECODING (กำลังถอดรหัส)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 tracking-widest uppercase mb-2">Discoverer (ผู้ค้นพบเบาะแส)</label>
              <select 
                name="discoverer" 
                value={formData.discoverer} 
                onChange={handleChange} 
                className="w-full bg-[#14141C] border text-white p-3 rounded-sm focus:outline-none focus:border-[#E5C57F] transition-colors cursor-pointer" 
                style={{ borderColor: 'var(--hsr-border)' }}
              >
                <option value="">-- ไม่ระบุ / เนื้อเรื่องหลัก (System) --</option>
                {/* 👇 เปลี่ยนจาก char.id เป็น char.uid และ char.name เป็น char.char_name 👇 */}
                {characters.map((char) => (
                  <option key={char.uid} value={char.char_name}>
                    {char.char_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-[10px] text-gray-400 tracking-widest uppercase mb-2">Image URL (ลิงก์รูปภาพ)</label>
              <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full bg-[#14141C] border text-white p-3 rounded-sm focus:outline-none focus:border-[#E5C57F] transition-colors" style={{ borderColor: 'var(--hsr-border)' }} placeholder="https://..." />
            </div>
          </div>

          {/* Details */}
          <div className="pt-4">
            <label className="block text-[10px] text-gray-400 tracking-widest uppercase mb-2">Intelligence Details (รายละเอียดเบาะแส) *</label>
            <div className="flex gap-2 mb-2">
              <button type="button" onClick={() => insertFormatting('b')} className="px-3 py-1 bg-[#14141C] border text-gray-300 rounded-sm hover:border-[#E5C57F] hover:text-[#E5C57F] transition-colors font-bold text-sm" style={{ borderColor: 'var(--hsr-border)' }}>B</button>
              <button type="button" onClick={() => insertFormatting('i')} className="px-3 py-1 bg-[#14141C] border text-gray-300 rounded-sm hover:border-[#E5C57F] hover:text-[#E5C57F] transition-colors italic text-sm" style={{ borderColor: 'var(--hsr-border)' }}>I</button>
              <button type="button" onClick={() => insertFormatting('u')} className="px-3 py-1 bg-[#14141C] border text-gray-300 rounded-sm hover:border-[#E5C57F] hover:text-[#E5C57F] transition-colors underline text-sm" style={{ borderColor: 'var(--hsr-border)' }}>U</button>
              <button type="button" onClick={() => insertFormatting('br/')} className="px-3 py-1 bg-[#14141C] border text-gray-300 rounded-sm hover:border-[#E5C57F] hover:text-[#E5C57F] transition-colors text-xs tracking-widest" style={{ borderColor: 'var(--hsr-border)' }}>ขึ้นบรรทัดใหม่</button>
            </div>

            <textarea 
              ref={textareaRef}
              required 
              name="details" 
              value={formData.details} 
              onChange={handleChange} 
              rows={8}
              className="w-full bg-[#14141C] border text-white p-4 rounded-sm focus:outline-none focus:border-[#E5C57F] transition-colors leading-relaxed" 
              style={{ borderColor: 'var(--hsr-border)' }} 
              placeholder="กรอกรายละเอียดเบาะแส..." 
            />
          </div>

          <div className="pt-6 border-t flex justify-end" style={{ borderColor: 'var(--hsr-border)' }}>
            <button type="submit" disabled={isSubmitting} className="bg-[#E5C57F]/10 text-[#E5C57F] border border-[#E5C57F] px-8 py-3 tracking-widest uppercase font-bold hover:bg-[#E5C57F] hover:text-black transition-all duration-300 disabled:opacity-50">
              {isSubmitting ? 'ENCRYPTING...' : 'SAVE RECORD'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}