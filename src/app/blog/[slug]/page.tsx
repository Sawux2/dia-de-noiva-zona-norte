/**
 * BLOG POST - Página individual de post com SEO completo
 * SSR + Schema BlogPosting + Breadcrumbs + posts relacionados
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/db/posts';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Comments from '@/components/blog/Comments';
import Gallery from '@/components/blog/Gallery';
import Testimonials from '@/components/blog/Testimonials';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post não encontrado' };

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://studioamendollanoivas.com.br/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://studioamendollanoivas.com.br/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: [post.author],
      images: [{ url: 'https://studioamendollanoivas.com.br' + post.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts('published');
  return posts.map(p => ({ slug: p.slug }));
}

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  noivas: { label: 'Noivas', emoji: '💍', color: '#b4823e' },
  madrinhas: { label: 'Madrinhas', emoji: '💐', color: '#9b7fa0' },
  debutantes: { label: 'Debutantes', emoji: '🎀', color: '#c47fa0' },
  eventos: { label: 'Eventos', emoji: '🎉', color: '#7a9fc4' },
  dicas: { label: 'Dicas', emoji: '💡', color: '#c4a07a' },
  'spa-day': { label: 'Spa Day', emoji: '🛁', color: '#7ac4b0' },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.category, 3);
  const catCfg = CATEGORY_CONFIG[post.category] || { label: post.category, emoji: '📝', color: '#b4823e' };

  const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    url: `https://studioamendollanoivas.com.br/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author, jobTitle: 'Maquiadora Profissional' },
    publisher: {
      '@type': 'Organization',
      name: 'Studio Amendola Noivas',
      logo: { '@type': 'ImageObject', url: 'https://studioamendollanoivas.com.br/logo.png' },
    },
    image: 'https://studioamendollanoivas.com.br' + post.coverImage,
    keywords: post.tags.join(', '),
    articleSection: catCfg.label,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioamendollanoivas.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://studioamendollanoivas.com.br/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://studioamendollanoivas.com.br/blog/${post.slug}` },
    ],
  };

  // Renderiza markdown simples
  function renderContent(md: string) {
    return md
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('## ')) return `<h2 key="${i}" style="color:#1a1a1a;font-size:22px;font-weight:700;margin:32px 0 12px;border-bottom:2px solid #f0ede8;padding-bottom:8px">${line.slice(3)}</h2>`;
        if (line.startsWith('### ')) return `<h3 key="${i}" style="color:#2d2d2d;font-size:18px;font-weight:600;margin:24px 0 8px">${line.slice(4)}</h3>`;
        if (line.startsWith('# ')) return ''; // Remove H1 (já no header)
        if (line.startsWith('- ') || line.startsWith('* ')) return `<li style="color:#444;font-size:16px;line-height:1.7;margin-bottom:6px;list-style:disc;margin-left:24px">${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
        if (line.match(/^\d\. /)) return `<li style="color:#444;font-size:16px;line-height:1.7;margin-bottom:6px;margin-left:24px">${line.slice(3).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
        if (line === '') return '<br/>';
        return `<p style="color:#444;font-size:16px;line-height:1.8;margin-bottom:12px">${line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1a1a1a">$1</strong>')}</p>`;
      })
      .join('');
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJSON) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main style={{ background: '#faf9f7', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '20px 20px 0' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '13px', color: '#888', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: '#ccc' }}>/</li>
              <li><Link href="/blog" style={{ color: '#888', textDecoration: 'none' }}>Blog</Link></li>
              <li style={{ color: '#ccc' }}>/</li>
              <li style={{ color: '#b4823e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{post.title}</li>
            </ol>
          </nav>
        </div>

        {/* Header do post */}
        <header style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: catCfg.color + '15', border: `1px solid ${catCfg.color}30`,
            borderRadius: '20px', padding: '5px 14px', marginBottom: '20px',
          }}>
            <span>{catCfg.emoji}</span>
            <span style={{ color: catCfg.color, fontSize: '12px', fontWeight: 600 }}>{catCfg.label}</span>
          </div>

          <h1 style={{ color: '#1a1a1a', fontSize: '36px', fontWeight: 800, lineHeight: 1.25, margin: '0 0 20px' }}>
            {post.title}
          </h1>

          <p style={{ color: '#666', fontSize: '17px', lineHeight: 1.6, margin: '0 0 24px' }}>
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', paddingBottom: '24px', borderBottom: '1px solid #e8e3dc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #b4823e, #d4a459)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '14px',
              }}>P</div>
              <div>
                <div style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 600 }}>{post.author}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Maquiadora Profissional</div>
              </div>
            </div>
            <div style={{ color: '#aaa', fontSize: '13px', display: 'flex', gap: '16px' }}>
              {post.publishedAt && (
                <span>📅 {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              )}
              <span>⏱️ {post.readTime} min de leitura</span>
              <span>👁️ {post.views} visualizações</span>
            </div>
          </div>
        </header>

        {/* Capa colorida */}
        <div style={{
          maxWidth: '860px', margin: '0 auto 0', padding: '0 20px',
        }}>
          <div style={{
            height: '300px',
            background: `linear-gradient(135deg, ${catCfg.color}30 0%, ${catCfg.color}10 100%)`,
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '40px',
          }}>
            <span style={{ fontSize: '100px', opacity: 0.5 }}>{catCfg.emoji}</span>
          </div>
        </div>

        {/* Conteúdo */}
        <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px 60px' }}>
          <div
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
            style={{ lineHeight: 1.8 }}
          />

          <Testimonials />
          <Gallery />

          {/* Tags */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e8e3dc' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  padding: '5px 12px', borderRadius: '20px',
                  background: '#f5f0eb', color: '#888', fontSize: '12px',
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div style={{
            marginTop: '48px',
            background: 'linear-gradient(135deg, #b4823e, #d4a459)',
            borderRadius: '20px', padding: '36px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌸</div>
            <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, margin: '0 0 10px' }}>
              Gostou das dicas?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 0 24px', fontSize: '15px' }}>
              Agende seu atendimento com a Priscila Amendola e transforme seu dia em algo inesquecível!
            </p>
            <a
              href={`https://wa.me/5511977670498?text=Oi%20Priscila!%20Li%20o%20post%20"${encodeURIComponent(post.title)}"%20e%20quero%20saber%20mais%20sobre%20os%20serviços%20🌸`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', color: '#b4823e',
                padding: '14px 28px', borderRadius: '30px',
                textDecoration: 'none', fontWeight: 700, fontSize: '15px',
              }}
            >
              📱 Agendar pelo WhatsApp
            </a>
          </div>

          <Comments postId={post.id} />
        </article>

        {/* Posts relacionados */}
        {related.length > 0 && (
          <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px 60px' }}>
            <h2 style={{ color: '#1a1a1a', fontSize: '22px', fontWeight: 700, margin: '0 0 24px' }}>
              📚 Posts Relacionados
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {related.map(rp => (
                <div key={rp.id} style={{
                  background: '#fff', borderRadius: '12px',
                  padding: '20px', border: '1px solid #f0ede8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <h3 style={{ color: '#1a1a1a', fontSize: '15px', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.35 }}>
                    <Link href={`/blog/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {rp.title}
                    </Link>
                  </h3>
                  <div style={{ display: 'flex', gap: '10px', color: '#aaa', fontSize: '12px' }}>
                    <span>⏱️ {rp.readTime}min</span>
                    <span>👁️ {rp.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
