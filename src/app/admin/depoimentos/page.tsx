'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AdminTestimonial {
  id: string;
  name: string;
  service: string;
  text: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'spam'>('pending');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: 'approved' | 'spam') {
    if (!confirm(`Deseja marcar este depoimento como ${newStatus}?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchTestimonials();
    } catch (e) {
      console.error(e);
      alert('Erro ao atualizar');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir este depoimento permanentemente?')) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTestimonials();
    } catch (e) {
      console.error(e);
      alert('Erro ao excluir');
    }
  }

  const filtered = testimonials.filter(t => filter === 'all' || t.status === filter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: '0 0 8px' }}>
              🌟 Avaliações e Depoimentos
            </h1>
            <p style={{ color: '#888', margin: 0, fontSize: '15px' }}>
              Aprove ou remova os depoimentos reais deixados pelas clientes no site.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'pending', label: 'Pendentes 🟡' },
            { id: 'approved', label: 'Aprovados ✅' },
            { id: 'spam', label: 'Spam 🚫' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              style={{
                padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 500,
                background: filter === f.id ? 'rgba(180,130,62,0.15)' : 'rgba(255,255,255,0.05)',
                color: filter === f.id ? '#d4a459' : '#aaa',
                border: `1px solid ${filter === f.id ? 'rgba(180,130,62,0.3)' : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ color: '#888' }}>Carregando depoimentos...</div>
        ) : filtered.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)',
            padding: '40px', textAlign: 'center', borderRadius: '16px', color: '#666'
          }}>
            Nenhum depoimento {filter !== 'all' && 'com este status'} encontrado.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map(item => (
              <div key={item.id} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between',
                gap: '24px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: '#b4823e', fontWeight: 600 }}>Serviço: {item.service}</div>
                    <div style={{
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
                      background: item.status === 'approved' ? 'rgba(74,222,128,0.1)' : item.status === 'spam' ? 'rgba(248,113,113,0.1)' : 'rgba(250,204,21,0.1)',
                      color: item.status === 'approved' ? '#4ade80' : item.status === 'spam' ? '#f87171' : '#facc15',
                    }}>
                      {item.status}
                    </div>
                  </div>

                  <p style={{ color: '#ccc', fontSize: '15px', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 16px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    "{item.text}"
                  </p>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px', color: '#666' }}>
                    <span>📅 {format(new Date(item.created_at), "d 'de' MMM, yyyy", { locale: ptBR })}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                  {item.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(item.id, 'approved')}
                      style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.1)', color: '#4ade80', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      ✅ Aprovar
                    </button>
                  )}
                  {item.status !== 'spam' && (
                    <button
                      onClick={() => handleStatusChange(item.id, 'spam')}
                      style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(250,204,21,0.3)', background: 'rgba(250,204,21,0.1)', color: '#facc15', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      🚫 Marcar Spam
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'rgba(248,113,113,0.1)', color: '#f87171', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: 'auto' }}
                  >
                    🗑️ Excluir
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
