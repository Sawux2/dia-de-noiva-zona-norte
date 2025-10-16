/**
 * ROOT LAYOUT - Layout Principal do Site
 * 
 * Next.js 14+ App Router
 * Este layout envolve TODAS as páginas do site
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Studio Amendola Noivas | Maquiagem e Penteado Profissional',
  description: 'Studio especializado em maquiagem e penteado profissional para noivas, madrinhas, debutantes e eventos em geral. Spa day completo em São Paulo.',
  keywords: ['maquiagem para noivas', 'penteado para noivas', 'dia de noiva', 'spa day', 'são paulo'],
  authors: [{ name: 'Studio Amendola Noivas' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://studioamendollanoivas.com.br',
    siteName: 'Studio Amendola Noivas',
    title: 'Studio Amendola Noivas | Maquiagem e Penteado Profissional',
    description: 'Studio especializado em maquiagem e penteado profissional para noivas, madrinhas, debutantes e eventos em geral.',
    images: [
      {
        url: 'https://studioamendollanoivas.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Amendola Noivas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Amendola Noivas | Maquiagem e Penteado Profissional',
    description: 'Studio especializado em maquiagem e penteado profissional para noivas.',
    images: ['https://studioamendollanoivas.com.br/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ykVcRf7lX3i7EmOON7kjUF8HQVH3JdKbio-JAGC5H6g', // Adicionar depois
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}