import { NextResponse } from 'next/server';
import { createTestimonial, getApprovedTestimonials } from '@/lib/db/testimonials';

export async function GET() {
  try {
    const testimonials = await getApprovedTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await createTestimonial(body);

    if (!testimonial) {
      return NextResponse.json({ error: 'Falha ao salvar depoimento' }, { status: 500 });
    }

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
