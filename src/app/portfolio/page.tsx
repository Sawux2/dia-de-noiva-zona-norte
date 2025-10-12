// src/app/portfolio/page.tsx - Portfolio Elegante e Sofisticado

import { Metadata } from 'next';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import PortfolioGallery from '@/components/Portfolio/PortfolioGallery';
import WhatsAppButton from '@/components/Common/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Portfolio - Studio Amendola Noivas',
  description: 'Conheça nosso portfolio de maquiagem e penteados para noivas. Trabalhos reais que transformam sonhos em realidade.',
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20 py-20 overflow-hidden">
          {/* Decorações sutis */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="bg-amber-100/50 text-amber-900 px-6 py-2 rounded-full text-sm font-medium border border-amber-200/50">
                  ✨ Nossos Trabalhos
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Portfolio de 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-400 to-stone-600">
                  elegância e beleza
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Cada noiva tem sua própria história. Veja como transformamos momentos especiais em memórias inesquecíveis através da maquiagem e penteados.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-200/50 shadow-sm">
                  <span className="text-amber-900 font-medium">💄 Maquiagem Profissional</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200/50 shadow-sm">
                  <span className="text-rose-900 font-medium">💐 Penteados Exclusivos</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-stone-200/50 shadow-sm">
                  <span className="text-stone-900 font-medium">👰 Especialistas em Noivas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <PortfolioGallery />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50/50 to-stone-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-amber-100/50 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💍</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pronta para ser a próxima?
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Agende seu teste de maquiagem e descubra o look perfeito para o seu grande dia.
              </p>
              
              <a
                href="/contato"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 via-rose-500 to-amber-700 text-white px-10 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
              >
                <span>Agendar Teste de Maquiagem</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}