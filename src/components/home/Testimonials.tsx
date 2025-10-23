/**
 * TESTIMONIALS SECTION - Depoimentos Reais do Google
 * 
 * Design inspirado no Google Reviews + paleta do salão
 * Com avaliações reais e schemas SEO
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSchemaGenerator } from '@/lib/schemas/useSchemaGenerator';
import { COMPANY_DATA } from '@/lib/schemas/companyData';

export default function Testimonials() {
  const [_expandedIndex, _setExpandedIndex] = useState<number | null>(null);

  // Avaliações REAIS do Google
  const testimonials = [
    { 
      name: 'Stephany Mesquita', 
      role: 'Cliente',
      comment: 'Uma excelente profissional, indico de olhos fechados ❤️❤️❤️❤️',
      avatar: 'SM',
      rating: 5,
      date: '20 de out. de 2023',
      reviews: 2,
      photos: 2
    },
    { 
      name: 'Marinna Queiroz Chaktekchnis', 
      role: 'Noiva',
      comment: 'Equipe excepcional... talentosos, atenciosos e no dia mega especial me fizeram me sentir linda e muito amada. Obrigada por tudo sempre. Muito sucesso. Super indico.',
      avatar: 'MQ',
      rating: 5,
      date: '17 de out. de 2023',
      reviews: 4,
      photos: 0
    },
    { 
      name: 'Melissa Santoro Frauches', 
      role: 'Noiva',
      comment: 'Atendimento incrível ❤️. Recepção sensacional, massagem maravilhosa, make e cabelo perfeitos … melhor dia de noiva ❤️🥹',
      avatar: 'MS',
      rating: 5,
      date: '16 de out. de 2023',
      reviews: 5,
      photos: 1
    },
    { 
      name: 'Vanessa Neves', 
      role: 'Cliente',
      comment: 'O melhor Studio da zona norte, ótimo atendimento, com os melhores produtos e ótimas profissionais, super indico',
      avatar: 'VN',
      rating: 5,
      date: '15 de out. de 2023',
      reviews: 4,
      photos: 0
    },
    { 
      name: 'Patricia Souza', 
      role: 'Cliente',
      comment: 'Muito aconchegante, atendimento maravilhoso e uma equipe sensacional, super recomendo 👍🏻🙏🏻',
      avatar: 'PS',
      rating: 5,
      date: '15 de out. de 2023',
      reviews: 1,
      photos: 0
    }
  ];

  // Calcula estatísticas
  const totalReviews = testimonials.length;
  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / totalReviews).toFixed(1);

  // Gera schemas automaticamente
  const { jsonLd } = useSchemaGenerator({
    pageType: 'home',
    customSchema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: COMPANY_DATA.name,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: averageRating,
          reviewCount: totalReviews,
          bestRating: '5',
          worstRating: '1'
        },
        review: testimonials.map((testimonial) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: testimonial.name
          },
          datePublished: (() => {
  const parsedDate = new Date(testimonial.date);
  return !isNaN(parsedDate.getTime())
    ? parsedDate.toISOString().split('T')[0]
    : undefined; // evita o erro se a data for inválida
})(),
          reviewBody: testimonial.comment,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: testimonial.rating,
            bestRating: '5',
            worstRating: '1'
          }
        }))
      }
    ]
  });

  return (
    <>
      {/* Injeta schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-stone-50 to-gray-50">
        {/* Background decorativo */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-stone-200/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ========================================
              HEADER DA SEÇÃO
              ======================================== */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* Badge Google-style */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg mb-6 border border-stone-200">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-stone-600">Avaliações no</div>
                <div className="text-sm font-bold text-stone-800">Google</div>
              </div>
            </div>

            {/* Rating geral */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-6xl font-bold text-stone-800">{averageRating}</div>
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-7 h-7 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-stone-600">Baseado em {totalReviews} avaliações</div>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="block text-stone-800">
                O Que Nossas Clientes
              </span>
              <span className="block text-amber-700 mt-2">
                Falam Sobre Nós
              </span>
            </h2>

            <p className="text-lg text-stone-600">
              Avaliações reais de quem confiou no Studio Amendola para momentos especiais
            </p>
          </div>

          {/* ========================================
              GRID DE DEPOIMENTOS
              ======================================== */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-stone-200 hover:border-amber-300 relative overflow-hidden"
              >
                {/* Brilho dourado sutil no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Conteúdo */}
                <div className="relative z-10">
                  {/* Header do card (Avatar + Info) */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Avatar com iniciais */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-md">
                      {testimonial.avatar}
                    </div>

                    {/* Info do usuário */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-stone-800 truncate">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span>{testimonial.reviews} avaliações</span>
                        {testimonial.photos > 0 && (
                          <>
                            <span>•</span>
                            <span>{testimonial.photos} fotos</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating com estrelas */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-stone-500">{testimonial.date}</span>
                  </div>

                  {/* Comentário */}
                  <p className="text-stone-700 text-sm leading-relaxed mb-4">
                    {testimonial.comment}
                  </p>

                  {/* Badge do role */}
                  <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-amber-800">
                    {testimonial.role}
                  </div>
                </div>

                {/* Ícone Google no canto */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================
              ESTATÍSTICAS
              ======================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-stone-200">
              <div className="text-4xl font-bold text-amber-700 mb-2">500+</div>
              <div className="text-sm text-stone-600">Noivas Atendidas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-stone-200">
              <div className="text-4xl font-bold text-amber-700 mb-2">{averageRating}⭐</div>
              <div className="text-sm text-stone-600">Avaliação Média</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-stone-200">
              <div className="text-4xl font-bold text-amber-700 mb-2">100%</div>
              <div className="text-sm text-stone-600">5 Estrelas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-stone-200">
              <div className="text-4xl font-bold text-amber-700 mb-2">7+</div>
              <div className="text-sm text-stone-600">Anos Experiência</div>
            </div>
          </div>

          {/* ========================================
              CTA FINAL
              ======================================== */}
          <div className="text-center">
            <Link
              href="https://www.google.com/search?q=studio+amendola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-stone-300 text-stone-800 font-semibold rounded-full shadow-lg hover:shadow-xl hover:border-amber-300 hover:bg-amber-50/50 transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              </svg>
              Ver Todas as Avaliações no Google
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}