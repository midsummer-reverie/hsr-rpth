// app/equipment/page.tsx
import prisma from '@/lib/prisma';
import EquipmentClient from './EquipmentClient';

export const dynamic = 'force-dynamic';
export default async function EquipmentPage() {
  // 1. ดึง Light Cones และบังคับเรียงตามระดับดาวจากมากไปน้อย (5 -> 4 -> 3)
  const rawLightCones = await prisma.light_cones.findMany({
    include: { paths: true },
    orderBy: [
      { path_id: 'asc' },
      { rarity: 'desc' }, // บังคับเรียงตามดาว (High -> Low)
      { name: 'asc' }
    ]
  });

  // 2. ดึงข้อมูล Relics ทั้งหมด
  const rawRelics = await prisma.relics.findMany({
    include: { paths: true },
    orderBy: [
      { set_name: 'asc' }
    ]
  });

  // 3. จัดกลุ่ม Light Cone ตาม Path
  const lightConesByPath = rawLightCones.reduce((acc, lc) => {
    const pathName = lc.paths.path_name;
    if (!acc[pathName]) acc[pathName] = { path: lc.paths, items: [] };
    acc[pathName].items.push(lc);
    return acc;
  }, {} as Record<string, { path: any; items: typeof rawLightCones }>);

  // 4. จัดกลุ่ม Relic ตามชื่อเซ็ต และ แยกกลุ่มตามระดับดาวอีกรอบ
  const relicsBySet = rawRelics.reduce((acc, relic) => {
    const setName = relic.set_name;
    const rarity = relic.rarity;
    
    if (!acc[setName]) {
      acc[setName] = { path: relic.paths, rarities: {} };
    }
    if (!acc[setName].rarities[rarity]) {
      acc[setName].rarities[rarity] = [];
    }
    acc[setName].rarities[rarity].push(relic);
    return acc;
  }, {} as Record<string, { path: any; rarities: Record<number, typeof rawRelics> }>);

  // 5. บังคับเรียงลำดับชิ้นส่วน: HEAD -> HANDS -> BODY -> SPHERE
  const pieceOrder: Record<string, number> = { 'HEAD': 1, 'HANDS': 2, 'BODY': 3, 'SPHERE': 4 };
  
  Object.keys(relicsBySet).forEach(setName => {
    Object.keys(relicsBySet[setName].rarities).forEach(rarity => {
      relicsBySet[setName].rarities[Number(rarity)].sort((a, b) => {
        return (pieceOrder[a.piece_type] || 99) - (pieceOrder[b.piece_type] || 99);
      });
    });
  });

  return <EquipmentClient lightConesByPath={lightConesByPath} relicsBySet={relicsBySet} />;
}