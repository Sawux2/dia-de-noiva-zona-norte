/**
 * BLOG - Listagem pública de posts com filtros por categoria
 * SEO otimizado para trazer clientes organicamente
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/db/posts';
import { PostCategory } from '@/lib/db/types';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'Blog | Studio Amendola Noivas — Dicas de Maquiagem, Penteado e Beleza',
  description: 'Dicas profissionais de maquiagem para noivas, madrinhas, debutantes e eventos. O blog do Studio Amendola Noivas — Zona Norte de São Paulo.',
  alternates: { canonical: 'https://studioamendollanoivas.com.br/blog' },
  openGraph: {
    title: 'Blog Studio Amendola Noivas | Dicas de Beleza para Noivas',
    description: 'Conteúdo profissional sobre maquiagem, penteado e beleza para casamentos em SP.',
    url: 'https://studioamendollanoivas.com.br/blog',
  },
};

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  noivas: { label: 'Noivas', emoji: '💍', color: '#b4823e' },
  madrinhas: { label: 'Madrinhas', emoji: '💐', color: '#9b7fa0' },
  debutantes: { label: 'Debutantes', emoji: '🎀', color: '#c47fa0' },
  eventos: { label: 'Eventos', emoji: '🎉', color: '#7a9fc4' },
  dicas: { label: 'Dicas', emoji: '💡', color: '#c4a07a' },
  'spa-day': { label: 'Spa Day', emoji: '🛁', color: '#7ac4b0' },
};

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const category = categoria as PostCategory | undefined;
  const posts = await getPublishedPosts(category);

  const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Studio Amendola Noivas',
    description: 'Dicas de maquiagem, penteado e beleza para noivas, debutantes e madrinhas.',
    url: 'https://studioamendollanoivas.com.br/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Studio Amendola Noivas',
      url: 'https://studioamendollanoivas.com.br',
    },
    blogPost: posts.slice(0, 10).map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `https://studioamendollanoivas.com.br/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: { '@type': 'Person', name: p.author },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJSON) }} />
      <Header />

      <main style={{ minHeight: '100vh', background: '#faf9f7', fontFamily: "'Inter', sans-serif" }}>
        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1008 0%, #2d1f0a 50%, #1a1008 100%)',
          padding: '80px 20px 60px', textAlign: 'center',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(180,130,62,0.15)', border: '1px solid rgba(180,130,62,0.3)',
              borderRadius: '20px', padding: '6px 16px', marginBottom: '20px',
            }}>
              <span>✨</span>
              <span style={{ color: '#d4a459', fontSize: '13px', fontWeight: 500 }}>Blog Studio Amendola</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
              Dicas de Beleza para o<br />
              <span style={{ background: 'linear-gradient(90deg, #b4823e, #d4a459)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Dia mais Especial
              </span>
            </h1>
            <p style={{ color: '#aaa', fontSize: '16px', margin: 0, lineHeight: 1.7 }}>
              Noivas, debutantes, madrinhas e eventos — dicas profissionais da Priscila Amendola
              para você brilhar no grande dia.
            </p>
          </div>
        </section>

        {/* Filtros por categoria */}
        <section style={{ background: '#fff', borderBottom: '1px solid #f0ede8', padding: '0 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
            <Link
              href="/blog"
              style={{
                padding: '16px 20px',
                borderBottom: !category ? '2px solid #b4823e' : '2px solid transparent',
                color: !category ? '#b4823e' : '#888',
                textDecoration: 'none', fontSize: '14px', fontWeight: !category ? 600 : 400,
                whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
            >
              Todos ({posts.length > 0 ? '↓' : '0'})
            </Link>
            {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
              <Link
                key={key}
                href={`/blog?categoria=${key}`}
                style={{
                  padding: '16px 20px',
                  borderBottom: category === key ? `2px solid ${cfg.color}` : '2px solid transparent',
                  color: category === key ? cfg.color : '#888',
                  textDecoration: 'none', fontSize: '14px',
                  fontWeight: category === key ? 600 : 400,
                  whiteSpace: 'nowrap', transition: 'all 0.2s',
                }}
              >
                {cfg.emoji} {cfg.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 20px' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <p>Nenhum post encontrado nesta categoria.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '28px',
            }}>
              {posts.map(post => {
                const catCfg = CATEGORY_CONFIG[post.category] || { label: post.category, emoji: '📝', color: '#b4823e' };
                return (
                  <article key={post.id} style={{
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    border: '1px solid #f0ede8',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                    }}
                  >
                    {/* Imagem de capa */}
                    <div style={{
                      height: '200px',
                      background: `linear-gradient(135deg, ${catCfg.color}20, ${catCfg.color}10)`,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '64px', opacity: 0.6 }}>{catCfg.emoji}</span>
                      <div style={{
                        position: 'absolute', top: '12px', left: '12px',
                        padding: '4px 10px', borderRadius: '20px',
                        background: catCfg.color + '20',
                        border: `1px solid ${catCfg.color}40`,
                        color: catCfg.color, fontSize: '11px', fontWeight: 600,
                      }}>
                        {catCfg.emoji} {catCfg.label}
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div style={{ padding: '24px' }}>
                      <h2 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.35 }}>
                        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {post.title}
                        </Link>
                      </h2>
                      <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px' }}>
                        {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f5f0eb' }}>
                        <div style={{ display: 'flex', gap: '12px', color: '#aaa', fontSize: '12px' }}>
                          <span>👁️ {post.views}</span>
                          <span>⏱️ {post.readTime}min</span>
                          {post.publishedAt && (
                            <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                          )}
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{
                            color: catCfg.color, fontSize: '13px', fontWeight: 600,
                            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px',
                          }}
                        >
                          Ler mais →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #b4823e 0%, #d4a459 100%)',
          padding: '60px 20px', textAlign: 'center',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: '#fff', fontSize: '30px', fontWeight: 700, margin: '0 0 12px' }}>
              Pronta para o Dia dos Seus Sonhos? 🌸
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', margin: '0 0 28px' }}>
              Agende seu atendimento com a Priscila Amendola e garanta um dia de noiva inesquecível.
            </p>
            <a
              href="https://wa.me/5511977670498?text=Oi%20Priscila!%20Vi%20o%20blog%20e%20quero%20agendar%20um%20atendimento%20🌸"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', color: '#b4823e',
                padding: '14px 28px', borderRadius: '30px',
                textDecoration: 'none', fontWeight: 700, fontSize: '16px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              📱 Agendar pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
