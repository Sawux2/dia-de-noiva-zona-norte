import { NextResponse } from 'next/server';
import { getAllAdminTestimonials } from '@/lib/db/testimonials';

export async function GET() {
  try {
    const testimonials = await getAllAdminTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
