/**
 * CAMADA DE DADOS - Blog Posts (Supabase)
 */

import { supabase } from '../supabase/client';
import { BlogPost, BlogPostInput, PostCategory, PostStatus } from './types';

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Map from Postgres Snake Case to TS Camel Case
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToPost(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    category: row.category as PostCategory,
    tags: row.tags || [],
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    focusKeyword: row.focus_keyword,
    status: row.status as PostStatus,
    author: row.author,
    views: row.views,
    readTime: calculateReadTime(row.content),
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Map from TS Camel Case to Postgres Snake Case
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPostToRow(post: Partial<BlogPostInput & { id?: string; views?: number; status?: string; publishedAt?: string | null }>): any {
  const row: any = {};
  if (post.id !== undefined) row.id = post.id;
  if (post.title !== undefined) row.title = post.title;
  if (post.slug !== undefined) row.slug = post.slug;
  if (post.excerpt !== undefined) row.excerpt = post.excerpt;
  if (post.content !== undefined) row.content = post.content;
  if (post.coverImage !== undefined) row.cover_image = post.coverImage;
  if (post.category !== undefined) row.category = post.category;
  if (post.tags !== undefined) row.tags = post.tags;
  if (post.seoTitle !== undefined) row.seo_title = post.seoTitle;
  if (post.seoDescription !== undefined) row.seo_description = post.seoDescription;
  if (post.focusKeyword !== undefined) row.focus_keyword = post.focusKeyword;
  if (post.status !== undefined) row.status = post.status;
  if (post.author !== undefined) row.author = post.author;
  if (post.views !== undefined) row.views = post.views;
  if (post.publishedAt !== undefined) row.published_at = post.publishedAt;
  return row;
}

// ========================================
// CRUD Functions
// ========================================

export async function getAllPosts(status?: PostStatus): Promise<BlogPost[]> {
  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }
  return data.map(mapRowToPost);
}

export async function getPublishedPosts(category?: PostCategory): Promise<BlogPost[]> {
  let query = supabase.from('blog_posts').select('*').eq('status', 'published').order('published_at', { ascending: false });
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return [];
  return data.map(mapRowToPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  if (data.status === 'published') {
    const newViews = (data.views || 0) + 1;
    await supabase.from('blog_posts').update({ views: newViews }).eq('id', data.id);
    data.views = newViews;
  }

  return mapRowToPost(data);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapRowToPost(data);
}

export async function createPost(input: BlogPostInput): Promise<BlogPost | null> {
  const row = mapPostToRow(input);
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(row)
    .select()
    .single();

  if (error || !data) {
    console.error('Error creating post:', error);
    return null;
  }
  return mapRowToPost(data);
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const row = mapPostToRow(updates);
  const { data, error } = await supabase
    .from('blog_posts')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return null;
  return mapRowToPost(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  return !error;
}

export async function publishPost(id: string): Promise<BlogPost | null> {
  return updatePost(id, {
    status: 'published',
    publishedAt: new Date().toISOString(),
  });
}

export async function getRelatedPosts(currentId: string, category: PostCategory, limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('id', currentId)
    .limit(limit);

  if (error) return [];
  return data.map(mapRowToPost);
}

export async function getPostStats() {
  const { data, error } = await supabase.from('blog_posts').select('status, views, title');
  if (error || !data) return { published: 0, drafts: 0, archived: 0, totalViews: 0, topPost: null };

  const published = data.filter(p => p.status === 'published').length;
  const drafts = data.filter(p => p.status === 'draft').length;
  const archived = data.filter(p => p.status === 'archived').length;
  const totalViews = data.reduce((sum, p) => sum + (p.views || 0), 0);
  const topPost = [...data].sort((a, b) => (b.views || 0) - (a.views || 0))[0];

  return { published, drafts, archived, totalViews, topPost: topPost ? topPost : null };
}
