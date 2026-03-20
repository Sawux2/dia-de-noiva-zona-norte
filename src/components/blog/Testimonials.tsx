'use client';

import { useState, useEffect } from 'react';

// Dados de fallback para o caso de não haver depoimentos no banco ainda
const FALLBACK = [
  {
    name: 'Amanda Silveira',
    service: 'Dia de Noiva',
    text: 'A Priscila foi incrível! Meu dia foi perfeito e a maquiagem durou até o fim da festa.',
    initial: 'A',
  }
];

export default function Testimonials() {
  const [data, setData] = useState<any[]>(FALLBACK);
  const [randomItem, setRandomItem] = useState<any>(FALLBACK[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // States do form
  const [nome, setNome] = useState('');
  const [servico, setServico] = useState('Dia de Noiva');
  const [texto, setTexto] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(fetchedData => {
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          const mapped = fetchedData.map(item => ({
            ...item,
            initial: item.name.charAt(0).toUpperCase()
          }));
          setData(mapped);
          setRandomItem(mapped[Math.floor(Math.random() * mapped.length)]);
        }
      })
      .catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !texto) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, service: servico, text: texto }),
      });

      if (res.ok) {
        setStatus('success');
        setNome('');
        setTexto('');
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="my-16 flex flex-col items-center">
      <div className="w-full p-8 rounded-3xl relative" style={{ background: 'linear-gradient(135deg, #faf7f2, #f5ecd8)' }}>
        <div className="flex justify-center mb-6">
          <span className="text-4xl shadow-sm rounded-full p-2 bg-white/50 border border-amber-100">⭐⭐⭐⭐⭐</span>
        </div>
        
        <blockquote className="text-center font-medium italic text-lg sm:text-xl leading-relaxed mb-8" style={{ color: '#4a3f35' }}>
          "{randomItem.text}"
        </blockquote>
        
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #b4823e, #d4a459)' }}>
            {randomItem.initial}
          </div>
          <div className="text-left">
            <div className="font-bold text-gray-900">{randomItem.name}</div>
            <div className="text-sm font-medium" style={{ color: '#b4823e' }}>{randomItem.service}</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-6 py-2 rounded-full font-semibold text-sm transition-all border-2 border-amber-200 hover:bg-amber-50 text-amber-700"
      >
        ✨ Já é cliente? Deixe seu depoimento
      </button>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-800"
            >
              ×
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Avalie nossa produção 💖</h3>
            
            {status === 'success' ? (
              <div className="text-center p-6 bg-green-50 rounded-2xl text-green-800 border border-green-200">
                <div className="text-4xl mb-4">✅</div>
                <p className="font-bold">Obrigado pelo carinho!</p>
                <p className="text-sm mt-2">Sua avaliação foi enviada e será revisada em breve para aparecer no site.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                  <input
                    type="text" required
                    value={nome} onChange={e => setNome(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:border-amber-500"
                    placeholder="Ex: Marina Silva"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qual serviço você realizou?</label>
                  <select
                    value={servico} onChange={e => setServico(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:border-amber-500"
                  >
                    <option>Dia de Noiva</option>
                    <option>Madrinha</option>
                    <option>Debutante 15 Anos</option>
                    <option>Penteado/Make Eventos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sua Avaliação</label>
                  <textarea
                    required rows={4}
                    value={texto} onChange={e => setTexto(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:border-amber-500 resize-none"
                    placeholder="Como foi seu dia com o Studio Amendola?"
                  />
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm">Erro ao enviar. Tente novamente.</p>
                )}

                <button
                  type="submit" disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl text-white font-bold text-lg mt-4 shadow-lg"
                  style={{ background: status === 'loading' ? '#aaa' : 'linear-gradient(135deg, #b4823e, #d4a459)' }}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Estrelinhas 🌟'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
