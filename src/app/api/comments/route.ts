import { NextResponse } from 'next/server';
import { createComment, getCommentsByPost } from '@/lib/db/comments';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId requirido' }, { status: 400 });
  }

  const comments = await getCommentsByPost(postId);
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const comment = await createComment(body);

    if (!comment) {
      return NextResponse.json({ error: 'Falha ao salvar comentário' }, { status: 500 });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
