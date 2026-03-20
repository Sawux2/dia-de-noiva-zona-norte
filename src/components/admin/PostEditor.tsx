/**
 * ADMIN BLOG EDITOR - Criar/Editar post com editor rico e SEO fields
 * Usado para: /admin/blog/novo e /admin/blog/[id]
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase/client';
import { PostCategory, BlogPost, PostStatus } from '@/lib/db/types';

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'noivas', label: '💍 Noivas' },
  { value: 'madrinhas', label: '💐 Madrinhas' },
  { value: 'debutantes', label: '🎀 Debutantes' },
  { value: 'eventos', label: '🎉 Eventos' },
  { value: 'dicas', label: '💡 Dicas de Beleza' },
  { value: 'spa-day', label: '🛁 Spa Day' },
];

const TEMPLATES: Record<string, { title: string; content: string }> = {
  noivas: {
    title: 'Maquiagem para Noivas em [cidade]: Guia Completo [ano]',
    content: `# Maquiagem para Noivas em [cidade]: Guia Completo\n\n## Introdução\n\nO dia do casamento é o mais especial da sua vida...\n\n## Por que investir em maquiagem profissional?\n\n- Durabilidade garantida por horas\n- Resistência às emoções do momento\n- Resultado fotogênico\n\n## Estilos de Maquiagem\n\n### Maquiagem Natural\n...\n\n### Maquiagem Glamourous\n...\n\n## Conclusão e Agendamento\n\nAgende seu teste de maquiagem com a Priscila Amendola!`,
  },
  debutantes: {
    title: 'Maquiagem para Debutantes: Dicas para a Festa de 15 Anos Perfeita',
    content: `# Maquiagem para Debutantes: Festa dos Sonhos\n\n## O Dia Mais Especial dos 15 Anos\n\nOs 15 anos marcam uma transição especial...\n\n## Tendências de Maquiagem para Debutantes\n\n### Look Romântico\n...\n\n### Look Moderno\n...\n\n## Dicas Essenciais\n\n1. Faça o teste antes\n2. Combine com o vestido\n3. Use produtos de qualidade\n\n## Agende seu Dia de Beleza!`,
  },
};

interface PostEditorProps {
  postId?: string;
}

export default function PostEditor({ postId }: PostEditorProps) {
  const router = useRouter();
  const isEdit = !!postId;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('noivas');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [focusKw, setFocusKw] = useState('');
  const [status, setStatus] = useState<PostStatus>('draft');
  const [coverImage, setCoverImage] = useState('/images/priscila-helena-maquiadora-zona-norte.webp');
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'preview'>('content');

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/blog/${postId}`)
        .then(r => r.json())
        .then((p: BlogPost) => {
          setTitle(p.title); setSlug(p.slug); setExcerpt(p.excerpt);
          setContent(p.content); setCategory(p.category);
          setTags(p.tags.join(', ')); setSeoTitle(p.seoTitle);
          setSeoDesc(p.seoDescription); setFocusKw(p.focusKeyword);
          setStatus(p.status); setCoverImage(p.coverImage || '');
        });
    }
  }, [postId, isEdit]);

  function generateSlug(text: string) {
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEdit || !slug) setSlug(generateSlug(val));
    if (!seoTitle) setSeoTitle(val + ' | Studio Amendola Noivas');
  }

  async function handleGenerateAI() {
    if (!title && !focusKw) {
      alert("Por favor, preencha o Título do Post ou a Palavra-chave Principal para a IA saber sobre o que escrever.");
      return;
    }
    const topic = title || focusKw;
    
    setGeneratingAI(true);
    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category })
      });
      
      if (!res.ok) throw new Error('Falha ao gerar');
      
      const data = await res.json();
      if (data.title) handleTitleChange(data.title);
      if (data.slug) setSlug(data.slug);
      if (data.excerpt) setExcerpt(data.excerpt);
      if (data.content) setContent(data.content);
      if (data.seoTitle) setSeoTitle(data.seoTitle);
      if (data.seoDescription) setSeoDesc(data.seoDescription);
      if (data.focusKeyword) setFocusKw(data.focusKeyword);
      if (data.tags && Array.isArray(data.tags)) setTags(data.tags.join(', '));
      
    } catch (e) {
      alert("Erro ao comunicar com a IA. Tente Novamente.");
      console.error(e);
    } finally {
      setGeneratingAI(false);
    }
  }

  function applyTemplate(cat: PostCategory) {
    const t = TEMPLATES[cat];
    if (t && !content) {
      setTitle(t.title);
      setContent(t.content);
      setSlug(generateSlug(t.title));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${generateSlug(title || 'capa')}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error', error);
      alert('Erro ao fazer upload da imagem');
    } else if (data) {
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);
      setCoverImage(publicUrlData.publicUrl);
    }
    setUploadingImage(false);
  }

  async function handleSave(publish = false) {
    setSaving(true);
    const body = {
      title, slug, excerpt, content, category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      seoTitle: seoTitle || title,
      seoDescription: seoDesc || excerpt,
      focusKeyword: focusKw,
      status: publish ? 'published' : status,
      author: 'Priscila Amendola',
      publishedAt: publish ? new Date().toISOString() : null,
      coverImage: coverImage,
    };

    const url = isEdit ? `/api/blog/${postId}` : '/api/blog';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (publish) router.push('/admin/blog');
    }
    setSaving(false);
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box' as const, fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = {
    display: 'block' as const, color: '#aaa', fontSize: '12px', fontWeight: 600,
    marginBottom: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.5px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', fontFamily: "'Inter', sans-serif" }}>
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 700, margin: 0 }}>
              {isEdit ? '✏️ Editar Post' : '✍️ Novo Post'}
            </h1>
            {saved && (
              <p style={{ color: '#4ade80', fontSize: '13px', margin: '4px 0 0' }}>✅ Salvo com sucesso!</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              style={{
                padding: '10px 18px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#ccc', fontSize: '14px', cursor: 'pointer',
              }}
            >
              {saving ? '...' : '💾 Salvar Rascunho'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              style={{
                padding: '10px 18px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #b4823e, #d4a459)',
                border: 'none', color: '#fff', fontSize: '14px',
                fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(180,130,62,0.3)',
              }}
            >
              🚀 Publicar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0' }}>
          {[
            { key: 'content', label: '📝 Conteúdo' },
            { key: 'seo', label: '🔍 SEO' },
            { key: 'preview', label: '👁️ Preview' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{
                padding: '10px 16px', background: 'none',
                border: 'none', borderBottom: activeTab === tab.key ? '2px solid #d4a459' : '2px solid transparent',
                color: activeTab === tab.key ? '#d4a459' : '#666',
                fontSize: '14px', cursor: 'pointer', fontWeight: activeTab === tab.key ? 600 : 400,
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Título */}
              <div>
                <label style={labelStyle}>Título do Post</label>
                <input
                  value={title} onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Ex: Como Escolher a Maquiagem Perfeita para Noivas..."
                  style={inputStyle}
                />
              </div>

              {/* Slug */}
              <div>
                <label style={labelStyle}>URL (Slug)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#555', fontSize: '13px', whiteSpace: 'nowrap' }}>/blog/</span>
                  <input
                    value={slug} onChange={e => setSlug(e.target.value)}
                    placeholder="url-do-post"
                    style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)' }}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label style={labelStyle}>Resumo / Excerpt</label>
                <textarea
                  value={excerpt} onChange={e => setExcerpt(e.target.value)}
                  rows={3} placeholder="Breve descrição do post (aparece na listagem)"
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {/* Content */}
              <div>
                <label style={labelStyle}>Conteúdo (Markdown)</label>
                <textarea
                  value={content} onChange={e => setContent(e.target.value)}
                  rows={20} placeholder="# Título&#10;&#10;Escreva seu conteúdo aqui em Markdown..."
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }}
                />
              </div>
            </div>

            {/* Sidebar direita */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Imagem de Capa */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                <label style={labelStyle}>Imagem de Capa</label>
                {coverImage && (
                  <div style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', height: '140px', background: '#333' }}>
                    <img src={coverImage} alt="Capa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="coverUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="coverUpload"
                    style={{
                      ...inputStyle,
                      display: 'block',
                      textAlign: 'center',
                      cursor: uploadingImage ? 'not-allowed' : 'pointer',
                      background: 'rgba(255,255,255,0.08)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {uploadingImage ? '⏳ Enviando...' : '📸 Trocar Imagem'}
                  </label>
                </div>
              </div>

              {/* Categoria */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                <label style={labelStyle}>Categoria</label>
                <select
                  value={category}
                  onChange={e => { setCategory(e.target.value as PostCategory); applyTemplate(e.target.value as PostCategory); }}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value} style={{ background: '#1a1a1a' }}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                <label style={labelStyle}>Tags SEO (separadas por vírgula)</label>
                <input
                  value={tags} onChange={e => setTags(e.target.value)}
                  placeholder="noiva, maquiagem, são paulo"
                  style={inputStyle}
                />
              </div>

              {/* Gerador IA */}
              <div style={{ background: 'linear-gradient(to bottom right, rgba(168,85,247,0.1), rgba(236,72,153,0.05))', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', padding: '16px' }}>
                <label style={{ ...labelStyle, color: '#c084fc' }}>🤖 Gerar Post com IA</label>
                <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 12px', lineHeight: 1.4 }}>
                  Preencha um título ou palavra-chave e deixe a inteligência artificial escrever todo o artigo de SEO magicamente.
                </p>
                <button
                  onClick={handleGenerateAI}
                  disabled={generatingAI}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '8px',
                    background: generatingAI ? '#555' : 'linear-gradient(135deg, #9333ea, #db2777)',
                    border: 'none', color: '#fff', fontSize: '13px', fontWeight: 600,
                    cursor: generatingAI ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {generatingAI ? '⏳ Gerando Artigo Completo...' : '✨ Escrever Post Magicamente'}
                </button>
              </div>

              {/* Templates */}
              <div style={{ background: 'rgba(180,130,62,0.06)', border: '1px solid rgba(180,130,62,0.15)', borderRadius: '12px', padding: '16px' }}>
                <label style={labelStyle}>⚡ Templates de Post</label>
                <p style={{ color: '#888', fontSize: '12px', margin: '0 0 12px' }}>
                  Clique para usar um template pré-pronto:
                </p>
                {Object.entries(TEMPLATES).map(([key, tmpl]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTitle(tmpl.title); setContent(tmpl.content);
                      setSlug(generateSlug(tmpl.title));
                      setCategory(key as PostCategory);
                    }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '8px 12px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px', color: '#aaa', fontSize: '12px', cursor: 'pointer',
                      marginBottom: '6px', transition: 'all 0.2s',
                    }}
                  >
                    {key === 'noivas' ? '💍 Template Noivas' : '🎀 Template Debutantes'}
                  </button>
                ))}
              </div>

              {/* Status */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                <label style={labelStyle}>Status</label>
                <select
                  value={status} onChange={e => setStatus(e.target.value as PostStatus)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="draft" style={{ background: '#1a1a1a' }}>📝 Rascunho</option>
                  <option value="published" style={{ background: '#1a1a1a' }}>✅ Publicado</option>
                  <option value="archived" style={{ background: '#1a1a1a' }}>📦 Arquivado</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ color: '#60a5fa', margin: '0 0 16px', fontSize: '16px' }}>
                🔍 Otimização para Google (SEO)
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Palavra-chave Principal (Focus Keyword)</label>
                <input
                  value={focusKw} onChange={e => setFocusKw(e.target.value)}
                  placeholder="Ex: maquiagem para noivas são paulo"
                  style={inputStyle}
                />
                <p style={{ color: '#555', fontSize: '12px', margin: '6px 0 0' }}>
                  A palavra-chave mais importante que você quer ranquear no Google.
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Title Tag (título no Google)</span>
                  <span style={{ color: seoTitle.length > 60 ? '#f87171' : '#4ade80' }}>
                    {seoTitle.length}/60
                  </span>
                </label>
                <input
                  value={seoTitle} onChange={e => setSeoTitle(e.target.value)}
                  placeholder="Título SEO — ideal 50-60 caracteres"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Meta Description (descrição no Google)</span>
                  <span style={{ color: seoDesc.length > 160 ? '#f87171' : '#4ade80' }}>
                    {seoDesc.length}/160
                  </span>
                </label>
                <textarea
                  value={seoDesc} onChange={e => setSeoDesc(e.target.value)}
                  rows={3} placeholder="Descrição que aparece nos resultados de busca — ideal 120-160 caracteres"
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Preview Google */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px' }}>
              <label style={labelStyle}>Preview no Google</label>
              <div style={{
                background: '#fff', borderRadius: '8px', padding: '16px',
                fontFamily: 'Arial, sans-serif', marginTop: '8px',
              }}>
                <div style={{ color: '#1a0dab', fontSize: '18px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {seoTitle || title || 'Título do Post'}
                </div>
                <div style={{ color: '#006621', fontSize: '13px', marginBottom: '4px' }}>
                  studioamendollanoivas.com.br › blog › {slug || 'url-do-post'}
                </div>
                <div style={{ color: '#545454', fontSize: '13px', lineHeight: 1.4 }}>
                  {seoDesc || excerpt || 'Descrição do post aparecerá aqui...'}
                </div>
              </div>
            </div>

            {/* SEO Score */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px' }}>
              <label style={labelStyle}>🏆 Checklist SEO</label>
              {[
                { label: 'Título preenchido', ok: !!title },
                { label: 'Slug definido', ok: !!slug },
                { label: 'Keyword focus definida', ok: !!focusKw },
                { label: 'Meta description (até 160 chars)', ok: !!seoDesc && seoDesc.length <= 160 },
                { label: 'SEO Title (até 60 chars)', ok: !!seoTitle && seoTitle.length <= 60 },
                { label: 'Conteúdo com mais de 300 palavras', ok: content.split(/\s+/).length > 300 },
                { label: 'Tags definidas', ok: !!tags },
                { label: 'Excerpt preenchido', ok: !!excerpt },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px' }}>{item.ok ? '✅' : '⭕'}</span>
                  <span style={{ color: item.ok ? '#aaa' : '#666', fontSize: '13px' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div style={{ maxWidth: '780px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '40px',
            }}>
              <div style={{
                display: 'inline-block', padding: '4px 12px', borderRadius: '20px',
                background: 'rgba(180,130,62,0.15)', color: '#d4a459',
                fontSize: '12px', marginBottom: '16px',
              }}>
                {CATEGORIES.find(c => c.value === category)?.label}
              </div>
              <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.3 }}>
                {title || 'Título do Post'}
              </h1>
              <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
                {excerpt || 'Resumo do post...'}
              </p>
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '24px 0' }} />
              <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-wrap' }}>
                {content || 'Conteúdo do post aparece aqui...'}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
