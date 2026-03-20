import { NextResponse } from 'next/server';
import { getAllAdminComments } from '@/lib/db/comments';

export async function GET() {
  try {
    const comments = await getAllAdminComments();
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
