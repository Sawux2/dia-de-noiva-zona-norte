'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data);
      })
      .catch(console.error);
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !content) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          author_name: name,
          author_email: email,
          content,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setContent('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '15px', color: '#333',
    boxSizing: 'border-box' as const, outline: 'none',
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <div className="mt-16 pt-12 border-t border-gray-200" id="comments">
      <h3 className="text-2xl font-bold mb-8 items-center flex gap-2" style={{ color: '#2b2b2b' }}>
        <span>Comentários</span>
        <span className="bg-amber-100 text-amber-800 text-sm py-1 px-3 rounded-full font-medium">
          {comments.length}
        </span>
      </h3>

      {/* Lista de Comentários */}
      <div className="space-y-6 mb-12">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Seja o primeiro a deixar um comentário neste post!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-800">{c.author_name}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(c.created_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{c.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Form de Comentário */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
        <h4 className="text-xl font-bold mb-6 text-gray-800">Deixe seu comentário</h4>
        
        {status === 'success' ? (
          <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 flex flex-col items-center py-8">
            <span className="text-4xl mb-3">✅</span>
            <p className="font-medium text-center">Seu comentário foi enviado e está aguardando aprovação.</p>
            <p className="text-sm text-green-700 mt-1">Obrigado por contribuir!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <input
                  type="text" required
                  value={name} onChange={e => setName(e.target.value)}
                  style={inputStyle}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email * <span className="text-xs font-normal text-gray-400">(não será publicado)</span></label>
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comentário *</label>
              <textarea
                required rows={4}
                value={content} onChange={e => setContent(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="O que você achou deste post?"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm">Ocorreu um erro ao enviar. Tente novamente.</p>
            )}

            <button
              type="submit" disabled={status === 'loading'}
              className="mt-4 px-8 py-3 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02]"
              style={{
                background: status === 'loading' ? '#aaa' : 'linear-gradient(135deg, #b4823e, #d4a459)',
                boxShadow: status === 'loading' ? 'none' : '0 4px 14px rgba(180, 130, 62, 0.3)',
              }}
            >
              {status === 'loading' ? 'Enviando...' : 'Publicar Comentário'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
