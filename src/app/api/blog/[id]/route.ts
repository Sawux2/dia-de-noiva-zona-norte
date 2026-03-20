/**
 * API ROUTE: /api/blog/[id] — Busca, atualiza e deleta post
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost, publishPost } from '@/lib/db/posts';
import { getSessionFromCookie, COOKIE_NAME } from '@/lib/auth/session';

async function getAuth(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  return getSessionFromCookie(cookie);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
  return NextResponse.json(post);
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
    
    // Ação de publicar
    if (body.action === 'publish') {
      const post = await publishPost(id);
      if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
      return NextResponse.json(post);
    }

    const post = await updatePost(id, body);
    if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuth(request);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { id } = await params;
  const deleted = await deletePost(id);
  if (!deleted) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
  return NextResponse.json({ success: true });
}
