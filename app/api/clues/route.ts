// app/api/clues/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // บันทึกข้อมูลลงฐานข้อมูล
    const newClue = await prisma.clue.create({
      data: {
        title: body.title,
        type: body.type,
        status: body.status || 'RECORDED',
        details: body.details,
        discoverer: body.discoverer || null,
        image_url: body.image_url || null,
      }
    });

    return NextResponse.json({ success: true, clue: newClue });
  } catch (error) {
    console.error("Error creating clue:", error);
    return NextResponse.json({ success: false, error: "Failed to save clue" }, { status: 500 });
  }
}