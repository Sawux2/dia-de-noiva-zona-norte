import { NextResponse } from 'next/server';
import { updateCommentStatus, deleteComment } from '@/lib/db/comments';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json();
    const success = await updateCommentStatus(id, status);
    
    if (!success) {
      return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await deleteComment(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
