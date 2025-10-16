/**
 * HERO SECTION - Banner Principal Premium
 * 
 * Design elegante e sofisticado para classe AA
 * Cores: Rose Gold, Champagne, Nude com gradientes
 * Com schemas SEO integrados
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Banner principal"
    >
      {/* ========================================
          BACKGROUND COM GRADIENTE LUXUOSO
          ======================================== */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
        {/* Overlay sutil para profundidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        
        {/* Elementos decorativos flutuantes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* ========================================
          CONTEÚDO PRINCIPAL
          ======================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* COLUNA ESQUERDA: Texto */}
          <div 
            className={`text-center lg:text-left transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Badge Elegante */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 border border-rose-100">
              <span className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Mais de 7 anos de experiência
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Beleza Exclusiva
              </span>
              <span className="block text-gray-800 mt-2">
                Para Momentos
              </span>
              <span className="block bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                Inesquecíveis
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Studio especializado em maquiagem e penteado de alta qualidade para 
              <span className="font-semibold text-rose-600"> noivas</span>,
              <span className="font-semibold text-pink-600"> debutantes </span>
              e eventos sofisticados em São Paulo.
            </p>

            {/* Lista de Diferenciais */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              {[
                '✨ Atendimento Personalizado',
                '💎 Produtos Premium',
                '🏠 Atendemos em Domicílio',
                '🎯 Spa Day Completo'
              ].map((item, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-gray-700 border border-rose-100"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* CTA Principal - WhatsApp */}
              <Link
                href="https://wa.me/5511977670498?text=Olá!%20Gostaria%20de%20agendar%20um%20horário"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                {/* Efeito shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Agendar pelo WhatsApp
                </span>
              </Link>

              {/* CTA Secundário */}
              <Link
                href="/servicos"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl border-2 border-rose-200 hover:border-rose-300 transform hover:scale-105 transition-all duration-300"
              >
                Conheça Nossos Serviços
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-10 pt-10 border-t border-rose-100">
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">Noivas Atendidas</div>
                </div>
                <div className="w-px h-12 bg-rose-200" />
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    7+
                  </div>
                  <div className="text-sm text-gray-600">Anos de Experiência</div>
                </div>
                <div className="w-px h-12 bg-rose-200" />
                <div className="text-center lg:text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Avaliação 5.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Imagem */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Container da imagem com efeitos */}
            <div className="relative group">
              {/* Efeito de brilho ao redor */}
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Imagem principal */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/priscila-helena-maquiadora-zona-norte.webp"
                  alt="Noiva sendo maquiada no Studio Amendola - Maquiagem profissional para casamento"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  priority
                  itemProp="image"
                />
                
                {/* Overlay gradiente sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Badge flutuante */}
              <div className="absolute -bottom-4 -right-4 px-6 py-4 bg-white rounded-2xl shadow-xl border border-rose-100 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Atendimento</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    Premium
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full opacity-20 blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-amber-300 to-rose-300 rounded-full opacity-20 blur-2xl animate-pulse delay-700" />
          </div>
        </div>
      </div>

      {/* ========================================
          SCROLL INDICATOR
          ======================================== */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-rose-400 rounded-full p-1">
          <div className="w-1 h-3 bg-rose-400 rounded-full mx-auto animate-pulse" />
        </div>
      </div>

      {/* ========================================
          SCHEMAS SEO (dados estruturados)
          ======================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": "https://studioamendollanoivas.com.br/images/priscila-helena-maquiadora-zona-norte.webp",
            "name": "Noiva sendo maquiada no Studio Amendola",
            "description": "Maquiagem profissional para noivas realizada por Priscila Amendola, especialista com mais de 7 anos de experiência",
            "creator": {
              "@type": "Person",
              "name": "Priscila Amendola"
            },
            "copyrightHolder": {
              "@type": "Organization",
              "name": "Studio Amendola Noivas"
            }
          })
        }}
      />
    </section>
  );
}