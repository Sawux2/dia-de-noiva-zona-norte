/**
 * ADMIN LEADS PAGE - Gestão completa de leads/clientes
 */

'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Lead, LeadStatus } from '@/lib/db/types';

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Novo', color: '#facc15', bg: 'rgba(250,204,21,0.1)' },
  contacted: { label: 'Contatado', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  converted: { label: 'Convertido', color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
  lost: { label: 'Perdido', color: '#888', bg: 'rgba(136,136,136,0.1)' },
};

const SERVICE_LABELS: Record<string, string> = {
  'maquiagem-noiva': '💍 Maq. Noiva', 'penteado-noiva': '💇 Pent. Noiva',
  'dia-de-noiva': '🌸 Dia de Noiva', 'madrinhas': '💐 Madrinhas',
  'debutante': '🎀 Debutante', 'evento': '🎉 Evento',
  'spa-day': '🛁 Spa Day', 'outro': '📋 Outro',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadLeads() {
    const r = await fetch('/api/leads');
    const data = await r.json();
    setLeads(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { loadLeads(); }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdatingId(id);
    await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await loadLeads();
    setUpdatingId(null);
  }

  async function deleteLead(id: string, name: string) {
    if (!confirm(`Deletar lead de "${name}"?`)) return;
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    await loadLeads();
  }

  function openWhatsApp(phone: string, name: string) {
    const clean = phone.replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá ${name}! Aqui é a Priscila do Studio Amendola Noivas 🌸. Vi que você tem interesse em nossos serviços. Podemos conversar?`);
    window.open(`https://wa.me/55${clean}?text=${msg}`, '_blank');
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, margin: 0 }}>🎯 Gestão de Leads</h1>
          <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>
            Gerencie clientes em potencial captados pelo site
          </p>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'Total de Leads', value: stats.total, color: '#d4a459', icon: '📋' },
            { label: 'Novos', value: stats.new, color: '#facc15', icon: '🔔' },
            { label: 'Convertidos', value: stats.converted, color: '#4ade80', icon: '✅' },
            { label: 'Taxa Conversão', value: `${stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}%`, color: '#a78bfa', icon: '📊' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ fontSize: '24px' }}>{s.icon}</span>
              <div>
                <div style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                <div style={{ color: s.color, fontSize: '24px', fontWeight: 700 }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
          {[
            { key: 'all', label: 'Todos' },
            { key: 'new', label: '🔔 Novos' },
            { key: 'contacted', label: '📞 Contatados' },
            { key: 'converted', label: '✅ Convertidos' },
            { key: 'lost', label: '❌ Perdidos' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '8px 14px', borderRadius: '8px',
                background: filter === f.key ? 'rgba(180,130,62,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === f.key ? 'rgba(180,130,62,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: filter === f.key ? '#d4a459' : '#888',
                fontSize: '13px', cursor: 'pointer',
              }}
            >
              {f.label} {f.key !== 'all' && `(${leads.filter(l => f.key === 'all' || l.status === f.key).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', paddingTop: '60px' }}>Carregando leads... ⏳</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(lead => {
              const sc = STATUS_CONFIG[lead.status];
              const isExpanded = expandedLead === lead.id;
              return (
                <div
                  key={lead.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px', overflow: 'hidden', transition: 'border-color 0.2s',
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px 130px 200px', padding: '16px 20px', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                  >
                    {/* Nome e contato */}
                    <div>
                      <div style={{ color: '#ddd', fontSize: '15px', fontWeight: 600 }}>{lead.name}</div>
                      <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>
                        📱 {lead.phone} {lead.email && `· ${lead.email}`}
                      </div>
                    </div>

                    {/* Serviço */}
                    <span style={{ color: '#aaa', fontSize: '13px' }}>
                      {SERVICE_LABELS[lead.service] || lead.service}
                    </span>

                    {/* Data do evento */}
                    <span style={{ color: '#666', fontSize: '13px' }}>
                      {lead.eventDate
                        ? new Date(lead.eventDate).toLocaleDateString('pt-BR')
                        : '—'}
                    </span>

                    {/* Status badge */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '4px 10px', borderRadius: '20px',
                      background: sc.bg, color: sc.color,
                      fontSize: '12px', fontWeight: 600,
                    }}>
                      {sc.label}
                    </span>

                    {/* Ações */}
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }} onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => openWhatsApp(lead.phone, lead.name)}
                        style={{
                          padding: '6px 12px', borderRadius: '8px',
                          background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
                          color: '#4ade80', fontSize: '12px', cursor: 'pointer', fontWeight: 500,
                        }}
                      >
                        📱 WhatsApp
                      </button>
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                        disabled={updatingId === lead.id}
                        style={{
                          padding: '6px 8px', borderRadius: '8px',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          color: '#aaa', fontSize: '12px', cursor: 'pointer',
                        }}
                      >
                        <option value="new" style={{ background: '#1a1a1a' }}>Novo</option>
                        <option value="contacted" style={{ background: '#1a1a1a' }}>Contatado</option>
                        <option value="converted" style={{ background: '#1a1a1a' }}>Convertido</option>
                        <option value="lost" style={{ background: '#1a1a1a' }}>Perdido</option>
                      </select>
                      <button
                        onClick={() => deleteLead(lead.id, lead.name)}
                        style={{
                          padding: '6px 8px', borderRadius: '8px',
                          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)',
                          color: '#f87171', fontSize: '12px', cursor: 'pointer',
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Accordion: detalhes */}
                  {isExpanded && (
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      padding: '16px 20px', background: 'rgba(0,0,0,0.2)',
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <div style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px' }}>Mensagem</div>
                          <div style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>{lead.message || '—'}</div>
                        </div>
                        <div>
                          <div style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px' }}>Origem</div>
                          <div style={{ color: '#bbb', fontSize: '13px', marginBottom: '8px' }}>
                            📍 {lead.source}<br />
                            {lead.utmSource && `🔍 Fonte: ${lead.utmSource}`}
                            {lead.utmMedium && ` · ${lead.utmMedium}`}
                          </div>
                          <div style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px' }}>Captado em</div>
                          <div style={{ color: '#777', fontSize: '12px' }}>
                            {new Date(lead.createdAt).toLocaleString('pt-BR')}
                          </div>
                          {lead.notes && (
                            <>
                              <div style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', margin: '12px 0 6px' }}>Notas</div>
                              <div style={{ color: '#aaa', fontSize: '13px' }}>{lead.notes}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', color: '#555', padding: '60px' }}>
                Nenhum lead encontrado com esse filtro.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
