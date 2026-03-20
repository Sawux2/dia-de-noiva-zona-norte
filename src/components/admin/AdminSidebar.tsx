/**
 * ADMIN SIDEBAR - Navegação premium dark
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/admin', icon: '📊', label: 'Dashboard', exact: true },
  { href: '/admin/blog', icon: '✍️', label: 'Blog & Posts', exact: false },
  { href: '/admin/comentarios', icon: '💬', label: 'Comentários', exact: false },
  { href: '/admin/depoimentos', icon: '🌟', label: 'Depoimentos', exact: false },
  { href: '/admin/leads', icon: '🎯', label: 'Leads', exact: false },
  { href: '/admin/analytics', icon: '📈', label: 'Analytics', exact: false },
  { href: '/admin/configuracoes', icon: '⚙️', label: 'Configurações', exact: false },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside style={{
      width: collapsed ? '72px' : '256px',
      minHeight: '100vh',
      background: '#0d0d0d',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      flexShrink: 0,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 16px' : '28px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #b4823e, #d4a459)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(180,130,62,0.25)',
        }}>
          🌸
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', lineHeight: 1.2 }}>
              Studio Amendola
            </div>
            <div style={{ color: '#888', fontSize: '11px' }}>Painel Admin</div>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        style={{
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          padding: '8px',
          margin: '8px',
          borderRadius: '8px',
          fontSize: '16px',
          textAlign: 'right',
          transition: 'color 0.2s',
        }}
        title={collapsed ? 'Expandir' : 'Recolher'}
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '8px' }}>
        {NAV_ITEMS.map(item => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '12px' : '12px 14px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                background: active
                  ? 'linear-gradient(135deg, rgba(180,130,62,0.15), rgba(212,164,89,0.1))'
                  : 'transparent',
                border: active
                  ? '1px solid rgba(180,130,62,0.25)'
                  : '1px solid transparent',
                transition: 'all 0.2s',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
              title={collapsed ? item.label : ''}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {!collapsed && (
                <span style={{
                  color: active ? '#d4a459' : '#aaa',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Link para o Site + Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#888',
            fontSize: '13px',
            marginBottom: '6px',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          title="Ver o site"
        >
          <span>🌐</span>
          {!collapsed && 'Ver Site'}
        </Link>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.15)',
            color: '#f87171',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title="Sair"
        >
          <span>🚪</span>
          {!collapsed && 'Sair'}
        </button>
      </div>
    </aside>
  );
}
