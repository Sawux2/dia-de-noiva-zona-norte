/**
 * API ROUTE: /api/leads/[id] — Atualiza e deleta lead
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, deleteLead } from '@/lib/db/leads';
import { getSessionFromCookie, COOKIE_NAME } from '@/lib/auth/session';

async function getAuth(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  return getSessionFromCookie(cookie);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuth(request);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuth(request);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const lead = await updateLead(id, body);
    if (!lead) return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    return NextResponse.json(lead);
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar lead' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuth(request);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteLead(id);
  if (!deleted) return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
  return NextResponse.json({ success: true });
}
