import { NextResponse } from 'next/server';
import { updateTestimonialStatus, deleteTestimonial } from '@/lib/db/testimonials';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json();
    const success = await updateTestimonialStatus(id, status);
    
    if (!success) {
      return NextResponse.json({ error: 'Erro ao atualizar depoimento' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await deleteTestimonial(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Erro ao deletar depoimento' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
