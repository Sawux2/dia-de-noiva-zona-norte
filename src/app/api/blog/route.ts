/**
 * API ROUTE: /api/blog — Lista e cria posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/db/posts';
import { getSessionFromCookie } from '@/lib/auth/session';
import { COOKIE_NAME } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as 'draft' | 'published' | 'archived' | null;
  const all = searchParams.get('all') === 'true';

  // Se pedir todos os posts (admin), verifica autenticação
  if (all || status) {
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    const session = await getSessionFromCookie(cookie);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    const posts = await getAllPosts(status || undefined);
    return NextResponse.json(posts);
  }

  // Posts públicos — apenas publicados
  const posts = await getAllPosts('published');
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const session = await getSessionFromCookie(cookie);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar post' }, { status: 400 });
  }
}
