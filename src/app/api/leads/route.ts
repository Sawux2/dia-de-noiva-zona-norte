/**
 * API ROUTE: /api/leads — Captura e lista leads
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllLeads, createLead } from '@/lib/db/leads';
import { getSessionFromCookie, COOKIE_NAME } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const session = await getSessionFromCookie(cookie);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as 'new' | 'contacted' | 'converted' | 'lost' | null;
  const leads = await getAllLeads(status || undefined);
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = await createLead({
      name: body.name || '',
      phone: body.phone || '',
      email: body.email || '',
      service: body.service || 'outro',
      eventDate: body.eventDate || null,
      message: body.message || '',
      source: body.source || '/',
      utmSource: body.utmSource || '',
      utmMedium: body.utmMedium || '',
      utmCampaign: body.utmCampaign || '',
    });
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar lead' }, { status: 400 });
  }
}
