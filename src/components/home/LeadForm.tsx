/**
 * FORMULÁRIO DE CAPTURA DE LEADS - Componente Flutuante/Modal
 * Captura nome, telefone, serviço e data do evento
 * Aparece no site público para filtrar leads qualificados
 */

'use client';

import { useState } from 'react';

const SERVICES = [
  { value: 'maquiagem-noiva', label: '💍 Maquiagem para Noiva' },
  { value: 'penteado-noiva', label: '💇 Penteado para Noiva' },
  { value: 'dia-de-noiva', label: '🌸 Dia de Noiva Completo' },
  { value: 'madrinhas', label: '💐 Madrinhas (grupo)' },
  { value: 'debutante', label: '🎀 Debutante (15 anos)' },
  { value: 'evento', label: '🎉 Evento / Formatura' },
  { value: 'spa-day', label: '🛁 Spa Day' },
  { value: 'outro', label: '📋 Outro' },
];

interface LeadFormProps {
  onClose?: () => void;
  source?: string;
}

export default function LeadForm({ onClose, source = '/' }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !service) {
      setError('Preencha nome, telefone e serviço desejado.');
      return;
    }
    setLoading(true);
    setError('');

    // Captura UTM params da URL
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone: phone.replace(/\D/g, ''),
          email: '', service, eventDate: eventDate || null, message,
          source: source || (typeof window !== 'undefined' ? window.location.pathname : '/'),
          utmSource: urlParams.get('utm_source') || '',
          utmMedium: urlParams.get('utm_medium') || '',
          utmCampaign: urlParams.get('utm_campaign') || '',
        }),
      });

      if (res.ok) {
        setSuccess(true);
        // Redireciona para WhatsApp após 1.5s
        setTimeout(() => {
          const msg = encodeURIComponent(
            `Olá Priscila! Me chamo ${name} e tenho interesse em ${SERVICES.find(s => s.value === service)?.label || service}${eventDate ? ` para ${new Date(eventDate).toLocaleDateString('pt-BR')}` : ''}. ${message && `\n\n${message}`}`
          );
          window.open(`https://wa.me/5511977670498?text=${msg}`, '_blank');
          if (onClose) onClose();
        }, 1500);
      } else {
        setError('Erro ao enviar. Tente pelo WhatsApp.');
      }
    } catch {
      setError('Erro de conexão. Tente pelo WhatsApp direto.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%', background: '#fff',
    border: '1.5px solid #e8e3dc', borderRadius: '10px',
    padding: '12px 14px', color: '#1a1a1a', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box' as const, fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.2s',
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
          Recebemos seu contato!
        </h3>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
          Redirecionando para o WhatsApp da Priscila... 💬
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '8px' }}>
      <div style={{ marginBottom: '14px' }}>
        <input
          value={name} onChange={e => setName(e.target.value)}
          placeholder="Seu nome completo *" required
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#b4823e')}
          onBlur={e => (e.target.style.borderColor = '#e8e3dc')}
        />
      </div>
      <div style={{ marginBottom: '14px' }}>
        <input
          value={phone} onChange={e => setPhone(formatPhone(e.target.value))}
          placeholder="WhatsApp / Telefone *" required type="tel"
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#b4823e')}
          onBlur={e => (e.target.style.borderColor = '#e8e3dc')}
        />
      </div>
      <div style={{ marginBottom: '14px' }}>
        <select
          value={service} onChange={e => setService(e.target.value)} required
          style={{ ...inputStyle, cursor: 'pointer', color: service ? '#1a1a1a' : '#888' }}
          onFocus={e => (e.target.style.borderColor = '#b4823e')}
          onBlur={e => (e.target.style.borderColor = '#e8e3dc')}
        >
          <option value="">Serviço desejado *</option>
          {SERVICES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <input
          value={eventDate} onChange={e => setEventDate(e.target.value)}
          type="date" placeholder="Data do evento"
          style={{ ...inputStyle, color: eventDate ? '#1a1a1a' : '#888' }}
          onFocus={e => (e.target.style.borderColor = '#b4823e')}
          onBlur={e => (e.target.style.borderColor = '#e8e3dc')}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <textarea
          value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Mensagem (opcional)..."
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={e => (e.target.style.borderColor = '#b4823e')}
          onBlur={e => (e.target.style.borderColor = '#e8e3dc')}
        />
      </div>

      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '8px', padding: '10px 14px', color: '#dc2626',
          fontSize: '13px', marginBottom: '14px',
        }}>
          {error}
        </div>
      )}

      <button
        type="submit" disabled={loading}
        style={{
          width: '100%', padding: '14px',
          background: loading ? '#ccc' : 'linear-gradient(135deg, #b4823e, #d4a459)',
          border: 'none', borderRadius: '10px',
          color: '#fff', fontSize: '15px', fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(180,130,62,0.3)',
        }}
      >
        {loading ? '⏳ Enviando...' : '📱 Solicitar Contato pelo WhatsApp'}
      </button>

      <p style={{ color: '#aaa', fontSize: '11px', textAlign: 'center', margin: '10px 0 0' }}>
        🔒 Seus dados são privados e não compartilhados.
      </p>
    </form>
  );
}
