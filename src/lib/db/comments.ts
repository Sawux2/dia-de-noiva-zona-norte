import { supabase } from '../supabase/client';

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
}

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  return data as Comment[];
}

export async function getAllAdminComments(): Promise<(Comment & { blog_posts: { title: string } })[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*, blog_posts(title)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin comments:', error);
    return [];
  }
  return data as any;
}

export async function createComment(data: Omit<Comment, 'id' | 'created_at' | 'status'>): Promise<Comment | null> {
  const { data: newComment, error } = await supabase
    .from('comments')
    .insert([{ ...data, status: 'pending' }])
    .select()
    .single();

  if (error || !newComment) {
    console.error('Error creating comment:', error);
    return null;
  }
  return newComment as Comment;
}

export async function updateCommentStatus(id: string, status: 'pending' | 'approved' | 'spam'): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .update({ status })
    .eq('id', id);

  return !error;
}

export async function deleteComment(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  return !error;
}
