/**
 * ADMIN CONFIGURAÇÕES - Gerenciar dados e configurações do site
 */

'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminSettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box' as const, fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = {
    display: 'block' as const, color: '#888', fontSize: '12px',
    fontWeight: 600, marginBottom: '6px',
    textTransform: 'uppercase' as const, letterSpacing: '0.5px',
  };
  const sectionStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '24px', marginBottom: '20px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, padding: '32px', overflow: 'auto', maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, margin: 0 }}>⚙️ Configurações</h1>
            <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>Personalize as informações do studio</p>
          </div>
          {saved && <span style={{ color: '#4ade80', fontSize: '14px' }}>✅ Salvo!</span>}
        </div>

        {/* Studio Info */}
        <div style={sectionStyle}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, margin: '0 0 20px' }}>🌸 Informações do Studio</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Nome do Studio</label>
                <input defaultValue="Studio Amendola Noivas" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Profissional</label>
                <input defaultValue="Priscila Amendola" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>WhatsApp</label>
                <input defaultValue="(11) 97767-0498" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>E-mail</label>
                <input defaultValue="priscilaamendola.sa1990@gmail.com" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Endereço</label>
              <input defaultValue="Avenida Julio Buono, 2386 — Vila Nivi, São Paulo SP" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div style={sectionStyle}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, margin: '0 0 20px' }}>🔗 Redes Sociais</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Instagram</label>
              <input defaultValue="https://www.instagram.com/amendolanoivas_/" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Facebook</label>
              <input defaultValue="https://www.facebook.com/studioamendolla/" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div style={sectionStyle}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, margin: '0 0 4px' }}>🔐 Segurança</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: '0 0 20px' }}>
            Para alterar senha em produção, use variáveis de ambiente: <code style={{ color: '#d4a459' }}>ADMIN_USERNAME</code> e <code style={{ color: '#d4a459' }}>ADMIN_PASSWORD</code> no Vercel.
          </p>
          <div style={{
            background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)',
            borderRadius: '10px', padding: '14px 16px',
          }}>
            <p style={{ color: '#facc15', fontSize: '13px', margin: 0 }}>
              ⚠️ No Vercel: Settings → Environment Variables → adicione ADMIN_USERNAME e ADMIN_PASSWORD para maior segurança.
            </p>
          </div>
        </div>

        {/* Integrações */}
        <div style={sectionStyle}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, margin: '0 0 4px' }}>🔌 Integrações Futuras</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: '0 0 20px' }}>Conecte serviços externos para potencializar o studio.</p>
          {[
            { icon: '🗄️', name: 'Supabase (Banco de Dados)', status: 'Fase 2', color: '#4ade80' },
            { icon: '📊', name: 'Google Analytics 4', status: 'Fase 5', color: '#60a5fa' },
            { icon: '🔍', name: 'Google Search Console', status: 'Fase 5', color: '#60a5fa' },
            { icon: '🤖', name: 'IA — Geração de Posts', status: 'Fase 3', color: '#a78bfa' },
          ].map(item => (
            <div key={item.name} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ color: '#ddd', fontSize: '14px' }}>{item.name}</span>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: '20px',
                background: `${item.color}15`, border: `1px solid ${item.color}30`,
                color: item.color, fontSize: '11px', fontWeight: 600,
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: '14px 28px', background: 'linear-gradient(135deg, #b4823e, #d4a459)',
            border: 'none', borderRadius: '12px', color: '#fff',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(180,130,62,0.3)',
          }}
        >
          💾 Salvar Configurações
        </button>
      </main>
    </div>
  );
}
