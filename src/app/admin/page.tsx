/**
 * ADMIN DASHBOARD PAGE - Painel principal com KPIs e gráficos
 */

'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts';

interface DashboardData {
  totalViews: number;
  totalViewsToday: number;
  totalViewsWeek: number;
  totalViewsMonth: number;
  totalLeads: number;
  totalLeadsMonth: number;
  conversionRate: number;
  publishedPosts: number;
  draftPosts: number;
  leadsNewCount: number;
  leadsConvertedCount: number;
  totalPostViews: number;
  topPost: { title: string; views: number } | null;
  viewsByDay: { date: string; views: number }[];
  viewsBySource: { source: string; count: number }[];
  viewsByDevice: { device: string; count: number }[];
  topPages: { page: string; views: number }[];
  topCities: { city: string; count: number }[];
  leadsByService: { service: string; count: number }[];
}

const COLORS = ['#b4823e', '#d4a459', '#f0c878', '#e8b84b', '#c69040', '#a07030'];
const PIE_COLORS = ['#b4823e', '#d4a459', '#f0c878', '#8b6030'];

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  padding: '24px',
};

function KpiCard({
  icon, label, value, sub, color = '#d4a459'
}: {
  icon: string; label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div style={{ ...CARD_STYLE, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '80px', height: '80px',
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        borderRadius: '50%',
      }} />
      <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ color: '#888', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ color: '#fff', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ color: color, fontSize: '12px', marginTop: '8px' }}>{sub}</div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sourceLabels: Record<string, string> = {
    google: 'Google', instagram: 'Instagram', facebook: 'Facebook',
    direct: 'Direto', direto: 'Direto', whatsapp: 'WhatsApp',
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#111',
      fontFamily: "'Inter', sans-serif",
    }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, overflow: 'auto', padding: '32px', minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
              Dashboard
            </h1>
            <p style={{ color: '#666', fontSize: '14px', margin: '4px 0 0' }}>
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(180,130,62,0.1)', border: '1px solid rgba(180,130,62,0.2)',
            borderRadius: '10px', padding: '8px 16px',
          }}>
            <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ color: '#d4a459', fontSize: '13px', fontWeight: 500 }}>Sistema Online</span>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', paddingTop: '80px', fontSize: '18px' }}>
            Carregando métricas... ⏳
          </div>
        ) : data ? (
          <>
            {/* KPI Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}>
              <KpiCard
                icon="👁️" label="Visitas Hoje" value={data.totalViewsToday}
                sub={`↑ ${data.totalViewsWeek} esta semana`}
              />
              <KpiCard
                icon="📅" label="Visitas Mês" value={data.totalViewsMonth}
                sub={`Total: ${data.totalViews.toLocaleString('pt-BR')}`} color="#60a5fa"
              />
              <KpiCard
                icon="🎯" label="Novos Leads" value={data.leadsNewCount}
                sub={`${data.leadsConvertedCount} convertidos`} color="#4ade80"
              />
              <KpiCard
                icon="💰" label="Tx. Conversão" value={`${data.conversionRate}%`}
                sub="leads → clientes" color="#a78bfa"
              />
              <KpiCard
                icon="✍️" label="Posts Publicados" value={data.publishedPosts}
                sub={`${data.draftPosts} rascunhos`} color="#f472b6"
              />
              <KpiCard
                icon="📖" label="Leituras de Posts" value={data.totalPostViews.toLocaleString('pt-BR')}
                sub={data.topPost ? `Top: ${data.topPost.title.slice(0, 25)}...` : ''} color="#fb923c"
              />
            </div>

            {/* Charts Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {/* Visitantes por Dia */}
              <div style={{ ...CARD_STYLE, gridColumn: '1 / -1' }}>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, margin: '0 0 24px' }}>
                  📈 Visitantes — Últimos 30 dias
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={data.viewsByDay}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={d => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      tick={{ fill: '#555', fontSize: 11 }}
                      axisLine={{ stroke: '#333' }}
                      tickLine={false}
                      interval={4}
                    />
                    <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', color: '#fff' }}
                      labelFormatter={d => new Date(d).toLocaleDateString('pt-BR')}
                    />
                    <Line
                      type="monotone" dataKey="views" stroke="#d4a459" strokeWidth={2.5}
                      dot={false} activeDot={{ r: 5, fill: '#b4823e' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {/* Origem do Tráfego */}
              <div style={CARD_STYLE}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>
                  🌍 Origem do Tráfego
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.viewsBySource.map(s => ({
                        name: sourceLabels[s.source] || s.source,
                        value: s.count,
                      }))}
                      cx="50%" cy="50%" innerRadius={45} outerRadius={80}
                      paddingAngle={3} dataKey="value"
                    >
                      {data.viewsBySource.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend
                      wrapperStyle={{ color: '#888', fontSize: '12px' }}
                      iconType="circle" iconSize={8}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Dispositivos */}
              <div style={CARD_STYLE}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>
                  📱 Dispositivos
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.viewsByDevice.map(d => ({
                        name: d.device === 'mobile' ? 'Mobile' : d.device === 'desktop' ? 'Desktop' : 'Tablet',
                        value: d.count,
                      }))}
                      cx="50%" cy="50%" innerRadius={45} outerRadius={80}
                      paddingAngle={3} dataKey="value"
                    >
                      {data.viewsByDevice.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ color: '#888', fontSize: '12px' }} iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Cidades */}
              <div style={CARD_STYLE}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>
                  🏙️ Top Cidades
                </h3>
                {data.topCities.slice(0, 6).map((c, i) => (
                  <div key={c.city} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#aaa', fontSize: '12px' }}>{c.city}</span>
                      <span style={{ color: '#d4a459', fontSize: '12px', fontWeight: 600 }}>{c.count}</span>
                    </div>
                    <div style={{ background: '#222', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${(c.count / (data.topCities[0]?.count || 1)) * 100}%`,
                        background: `linear-gradient(90deg, #b4823e, #d4a459)`,
                        borderRadius: '4px',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Top Páginas */}
              <div style={CARD_STYLE}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>
                  🏆 Top Páginas
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  {data.topPages.slice(0, 8).map((p, i) => (
                    <div key={p.page} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <span style={{
                          color: '#b4823e', fontSize: '12px', fontWeight: 700,
                          width: '20px', flexShrink: 0,
                        }}>
                          #{i + 1}
                        </span>
                        <span style={{
                          color: '#aaa', fontSize: '13px',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {p.page === '/' ? 'Home' : p.page}
                        </span>
                      </div>
                      <span style={{
                        color: '#d4a459', fontSize: '13px', fontWeight: 600,
                        flexShrink: 0, marginLeft: '12px',
                      }}>
                        {p.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leads por Serviço */}
              <div style={CARD_STYLE}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>
                  💅 Leads por Serviço
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.leadsByService} layout="vertical" barSize={10}>
                    <XAxis type="number" tick={{ fill: '#555', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <YAxis
                      type="category" dataKey="service"
                      tick={{ fill: '#888', fontSize: 11 }}
                      axisLine={false} tickLine={false} width={100}
                      tickFormatter={(v) => {
                        const labels: Record<string, string> = {
                          'maquiagem-noiva': 'Maq. Noiva', 'dia-de-noiva': 'Dia de Noiva',
                          'debutante': 'Debutante', 'madrinhas': 'Madrinhas',
                          'evento': 'Evento', 'spa-day': 'Spa Day',
                        };
                        return labels[v] || v;
                      }}
                    />
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#b4823e" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ ...CARD_STYLE, marginTop: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>
                ⚡ Ações Rápidas
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { href: '/admin/blog/novo', icon: '✍️', label: 'Novo Post', color: '#b4823e' },
                  { href: '/admin/leads', icon: '🎯', label: 'Ver Leads', color: '#4ade80' },
                  { href: '/admin/analytics', icon: '📈', label: 'Analytics Completo', color: '#60a5fa' },
                  { href: '/blog', icon: '🌐', label: 'Ver Blog', color: '#a78bfa', target: '_blank' },
                ].map(action => (
                  <a
                    key={action.href}
                    href={action.href}
                    target={action.target}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      background: `${action.color}15`,
                      border: `1px solid ${action.color}30`,
                      borderRadius: '10px',
                      color: action.color,
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#666', paddingTop: '80px' }}>
            Erro ao carregar dados. Verifique se está logado.
          </div>
        )}
      </main>
    </div>
  );
}
