/**
 * ADMIN ANALYTICS PAGE - Métricas completas de visitantes
 */

'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';

const PIE_COLORS = ['#b4823e', '#d4a459', '#f0c878', '#8b6030', '#c69040'];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/dashboard?days=${period}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  const CARD = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '24px',
  };

  const sourceLabels: Record<string, string> = {
    google: 'Google', instagram: 'Instagram', facebook: 'Facebook',
    direct: 'Direto', direto: 'Direto', whatsapp: 'WhatsApp',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, margin: 0 }}>📈 Analytics</h1>
            <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>
              Análise de visitantes e comportamento do site
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[7, 30, 90].map(d => (
              <button
                key={d}
                onClick={() => setPeriod(d)}
                style={{
                  padding: '8px 14px', borderRadius: '8px',
                  background: period === d ? 'rgba(180,130,62,0.2)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${period === d ? 'rgba(180,130,62,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  color: period === d ? '#d4a459' : '#888', fontSize: '13px', cursor: 'pointer',
                }}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', paddingTop: '80px', fontSize: '16px' }}>
            Carregando analytics... ⏳
          </div>
        ) : data ? (
          <>
            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
              {[
                { icon: '👁️', label: 'Total de Visitas', value: (data.totalViewsMonth as number)?.toLocaleString('pt-BR'), sub: `${period} dias` },
                { icon: '📅', label: 'Hoje', value: data.totalViewsToday as number, sub: 'visitas hoje' },
                { icon: '📊', label: 'Esta Semana', value: data.totalViewsWeek as number, sub: 'vs 7 dias' },
                { icon: '🎯', label: 'Leads Capturados', value: data.totalLeads as number, sub: `${data.totalLeadsMonth} este mês` },
              ].map(kpi => (
                <div key={kpi.label} style={{ ...CARD }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{kpi.icon}</div>
                  <div style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{kpi.label}</div>
                  <div style={{ color: '#fff', fontSize: '28px', fontWeight: 700 }}>{kpi.value}</div>
                  <div style={{ color: '#d4a459', fontSize: '12px', marginTop: '4px' }}>{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Area Chart - Visitantes */}
            <div style={{ ...CARD, marginBottom: '20px' }}>
              <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, margin: '0 0 24px' }}>
                📈 Visitantes por Dia — Últimos {period} dias
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={(data.viewsByDay as { date: string; views: number }[]) || []}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b4823e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#b4823e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={d => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    tick={{ fill: '#555', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false}
                    interval={Math.floor(period / 7)}
                  />
                  <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', color: '#fff' }}
                    labelFormatter={d => new Date(d).toLocaleDateString('pt-BR')}
                  />
                  <Area type="monotone" dataKey="views" stroke="#d4a459" strokeWidth={2} fill="url(#viewsGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {/* Origem do tráfego */}
              <div style={CARD}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>🌍 Origem do Tráfego</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={((data.viewsBySource as { source: string; count: number }[]) || []).map(s => ({ name: sourceLabels[s.source] || s.source, value: s.count }))}
                      cx="50%" cy="50%" innerRadius={40} outerRadius={75} paddingAngle={3} dataKey="value"
                    >
                      {((data.viewsBySource as unknown[]) || []).map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                    <Legend wrapperStyle={{ color: '#888', fontSize: '12px' }} iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Dispositivos */}
              <div style={CARD}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 16px' }}>📱 Dispositivos</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={((data.viewsByDevice as { device: string; count: number }[]) || []).map(d => ({
                        name: d.device === 'mobile' ? 'Mobile' : d.device === 'desktop' ? 'Desktop' : 'Tablet',
                        value: d.count,
                      }))}
                      cx="50%" cy="50%" innerRadius={40} outerRadius={75} paddingAngle={3} dataKey="value"
                    >
                      {((data.viewsByDevice as unknown[]) || []).map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                    <Legend wrapperStyle={{ color: '#888', fontSize: '12px' }} iconType="circle" iconSize={8} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Cidades */}
              <div style={CARD}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 20px' }}>🏙️ Top Cidades</h3>
                {((data.topCities as { city: string; count: number }[]) || []).slice(0, 6).map((c, i) => (
                  <div key={c.city} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ color: '#aaa', fontSize: '13px' }}>{c.city}</span>
                      <span style={{ color: '#d4a459', fontSize: '12px', fontWeight: 600 }}>{c.count}</span>
                    </div>
                    <div style={{ background: '#222', borderRadius: '4px', height: '5px' }}>
                      <div style={{
                        height: '100%',
                        width: `${(c.count / ((data.topCities as { count: number }[])[0]?.count || 1)) * 100}%`,
                        background: 'linear-gradient(90deg, #b4823e, #d4a459)',
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Páginas */}
            <div style={CARD}>
              <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 20px' }}>🏆 Páginas Mais Visitadas</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={((data.topPages as { page: string; views: number }[]) || []).slice(0, 8).map(p => ({
                    ...p,
                    page: p.page === '/' ? 'Home' : p.page.replace('/blog/', '').slice(0, 30),
                  }))}
                  layout="vertical" barSize={12}
                >
                  <XAxis type="number" tick={{ fill: '#555', fontSize: 11 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                  <YAxis type="category" dataKey="page" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} width={150} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="views" fill="#b4823e" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#666', paddingTop: '60px' }}>Erro ao carregar analytics.</div>
        )}
      </main>
    </div>
  );
}
