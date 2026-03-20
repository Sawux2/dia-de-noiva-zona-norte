/**
 * ADMIN BLOG - Lista de posts com CRUD completo
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BlogPost } from '@/lib/db/types';

const STATUS_COLORS: Record<string, string> = {
  published: '#4ade80',
  draft: '#facc15',
  archived: '#888',
};
const STATUS_LABELS: Record<string, string> = {
  published: 'Publicado',
  draft: 'Rascunho',
  archived: 'Arquivado',
};
const CATEGORY_LABELS: Record<string, string> = {
  noivas: '💍 Noivas', madrinhas: '💐 Madrinhas', debutantes: '🎀 Debutantes',
  eventos: '🎉 Eventos', dicas: '💡 Dicas', 'spa-day': '🛁 Spa Day',
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function loadPosts() {
    const r = await fetch('/api/blog?all=true');
    const data = await r.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { loadPosts(); }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Deletar "${title}"? Esta ação é irreversível.`)) return;
    setDeleting(id);
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    await loadPosts();
    setDeleting(null);
  }

  async function handlePublish(id: string) {
    await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'publish' }),
    });
    await loadPosts();
  }

  async function handleArchive(id: string) {
    await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'archived' }),
    });
    await loadPosts();
  }

  const filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, margin: 0 }}>✍️ Blog & Posts</h1>
            <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>
              {posts.filter(p => p.status === 'published').length} publicados · {posts.filter(p => p.status === 'draft').length} rascunhos
            </p>
          </div>
          <Link
            href="/admin/blog/novo"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', background: 'linear-gradient(135deg, #b4823e, #d4a459)',
              borderRadius: '10px', color: '#fff', textDecoration: 'none',
              fontSize: '14px', fontWeight: 600, boxShadow: '0 4px 12px rgba(180,130,62,0.3)',
            }}
          >
            + Novo Post
          </Link>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[
            { key: 'all', label: 'Todos' },
            { key: 'published', label: '✅ Publicados' },
            { key: 'draft', label: '📝 Rascunhos' },
            { key: 'archived', label: '📦 Arquivados' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '8px 16px', borderRadius: '8px',
                background: filter === f.key ? 'rgba(180,130,62,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === f.key ? 'rgba(180,130,62,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: filter === f.key ? '#d4a459' : '#888',
                fontSize: '13px', cursor: 'pointer', fontWeight: filter === f.key ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tabela */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '60px', fontSize: '16px' }}>Carregando posts... ⏳</div>
        ) : (
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px', overflow: 'hidden',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 120px 100px 80px 160px',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {['Título', 'Categoria', 'Status', 'Views', 'Ações'].map(h => (
                <span key={h} style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#555' }}>
                Nenhum post encontrado.
              </div>
            ) : filtered.map(post => (
              <div
                key={post.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 120px 100px 80px 160px',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Título */}
                <div>
                  <div style={{ color: '#ddd', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                    {post.title}
                  </div>
                  <div style={{ color: '#555', fontSize: '12px' }}>
                    {post.focusKeyword} · {post.readTime}min de leitura
                  </div>
                </div>

                {/* Categoria */}
                <span style={{ color: '#aaa', fontSize: '12px' }}>
                  {CATEGORY_LABELS[post.category] || post.category}
                </span>

                {/* Status */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '4px 10px', borderRadius: '20px',
                  background: `${STATUS_COLORS[post.status]}15`,
                  border: `1px solid ${STATUS_COLORS[post.status]}30`,
                  color: STATUS_COLORS[post.status], fontSize: '12px', fontWeight: 500,
                }}>
                  {STATUS_LABELS[post.status]}
                </span>

                {/* Views */}
                <span style={{ color: '#d4a459', fontSize: '13px', fontWeight: 600 }}>
                  {post.views.toLocaleString('pt-BR')} 👁️
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    style={{
                      padding: '6px 10px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.07)', color: '#ccc',
                      fontSize: '12px', textDecoration: 'none',
                    }}
                    title="Editar"
                  >
                    ✏️
                  </Link>
                  {post.status === 'draft' && (
                    <button
                      onClick={() => handlePublish(post.id)}
                      style={{
                        padding: '6px 10px', borderRadius: '8px',
                        background: 'rgba(74,222,128,0.1)', color: '#4ade80',
                        border: '1px solid rgba(74,222,128,0.2)', fontSize: '12px', cursor: 'pointer',
                      }}
                      title="Publicar"
                    >
                      🚀
                    </button>
                  )}
                  {post.status === 'published' && (
                    <button
                      onClick={() => handleArchive(post.id)}
                      style={{
                        padding: '6px 10px', borderRadius: '8px',
                        background: 'rgba(136,136,136,0.1)', color: '#888',
                        border: '1px solid rgba(136,136,136,0.2)', fontSize: '12px', cursor: 'pointer',
                      }}
                      title="Arquivar"
                    >
                      📦
                    </button>
                  )}
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    style={{
                      padding: '6px 10px', borderRadius: '8px',
                      background: 'rgba(96,165,250,0.08)', color: '#60a5fa',
                      fontSize: '12px', textDecoration: 'none',
                    }}
                    title="Ver no site"
                  >
                    🔗
                  </a>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    style={{
                      padding: '6px 10px', borderRadius: '8px',
                      background: 'rgba(239,68,68,0.1)', color: '#f87171',
                      border: '1px solid rgba(239,68,68,0.15)', fontSize: '12px',
                      cursor: 'pointer',
                    }}
                    title="Deletar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
