/**
 * ADMIN LAYOUT - Layout compartilhado do painel
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel Administrativo | Studio Amendola Noivas',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}
