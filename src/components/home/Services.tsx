/**
 * SERVICES SECTION - Seção de Serviços Premium
 * 
 * Exibe serviços principais com design elegante
 * Inclui schemas SEO para cada serviço (Service + ItemList)
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_DATA } from '@/lib/schemas/companyData';

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Serviços principais para exibir na home
  const featuredServices = [
    {
      id: 'maquiagem-noivas',
      title: 'Maquiagem para Noivas',
      description: 'Maquiagem impecável e duradoura para o dia mais especial da sua vida. Produtos premium e técnicas exclusivas.',
      icon: '💍',
      image: '/images/services/maquiagem-noivas.webp',
      benefits: ['Teste de maquiagem incluído', 'Produtos de alta fixação', 'Atendimento personalizado'],
      category: 'BeautySalon',
      url: '/servicos/maquiagem-noivas'
    },
    {
      id: 'penteado-noivas',
      title: 'Penteado para Noivas',
      description: 'Penteados sofisticados e elegantes que completam seu look. Criamos o estilo perfeito para você.',
      icon: '👰',
      image: '/images/services/penteado-noivas.webp',
      benefits: ['Prova de penteado', 'Técnicas de fixação profissional', 'Assessórios incluídos'],
      category: 'BeautySalon',
      url: '/servicos/penteado-noivas'
    },
    {
      id: 'dia-de-noiva',
      title: 'Dia de Noiva Completo',
      description: 'Experiência completa de spa day: maquiagem, penteado, massagem e muito mais em um só lugar.',
      icon: '✨',
      image: '/images/services/dia-de-noiva.webp',
      benefits: ['Spa day exclusivo', 'Maquiagem + Penteado', 'Massagem relaxante'],
      category: 'DaySpa',
      url: '/servicos/dia-de-noiva'
    },
    {
      id: 'maquiagem-madrinhas',
      title: 'Maquiagem para Madrinhas',
      description: 'Maquiagem profissional para que você brilhe ao lado da noiva com elegância e sofisticação.',
      icon: '💐',
      image: '/images/services/maquiagem-madrinhas.webp',
      benefits: ['Harmonização com vestido', 'Longa duração', 'Retoques incluídos'],
      category: 'BeautySalon',
      url: '/servicos/maquiagem-madrinhas'
    },
    {
      id: 'maquiagem-debutantes',
      title: 'Maquiagem para Debutantes',
      description: 'Maquiagem especial para a festa de 15 anos, valorizando sua beleza natural com elegância.',
      icon: '🎀',
      image: '/images/services/maquiagem-debutantes.webp',
      benefits: ['Estilo jovem e sofisticado', 'Prova de maquiagem', 'Look completo'],
      category: 'BeautySalon',
      url: '/servicos/maquiagem-debutantes'
    },
    {
      id: 'maquiagem-eventos',
      title: 'Maquiagem para Eventos',
      description: 'Maquiagem profissional para festas, aniversários e eventos sociais de alto padrão.',
      icon: '🎉',
      image: '/images/services/maquiagem-eventos.webp',
      benefits: ['Versatilidade de estilos', 'Produtos premium', 'Consultoria de imagem'],
      category: 'BeautySalon',
      url: '/servicos/maquiagem-eventos'
    }
  ];

  return (
    <section 
      id="servicos"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
      
      {/* Elementos decorativos */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-rose-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-amber-200/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================
            HEADER DA SEÇÃO
            ======================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 border border-rose-100">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Nossos Serviços
            </span>
          </div>

          {/* Título */}
          <h2 
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold mb-6"
            itemProp="name"
          >
            <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Serviços Exclusivos
            </span>
            <br />
            <span className="text-gray-800">
              Para Momentos Especiais
            </span>
          </h2>

          {/* Descrição */}
          <p 
            className="text-lg text-gray-700 leading-relaxed"
            itemProp="description"
          >
            Oferecemos maquiagem e penteado profissional de alto padrão para noivas, 
            debutantes, madrinhas e eventos sofisticados em toda São Paulo.
          </p>
        </div>

        {/* ========================================
            GRID DE SERVIÇOS
            ======================================== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Service"
            >
              <meta itemProp="position" content={String(index + 1)} />
              
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-rose-100 transform hover:-translate-y-2">
                
                {/* Imagem */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Studio Amendola Noivas`}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    itemProp="image"
                  />
                  
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Ícone flutuante */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Badge de categoria */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-rose-600">
                    {service.category === 'BeautySalon' ? 'Beleza' : 'Spa Day'}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  {/* Título */}
                  <h3 
                    className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors"
                    itemProp="name"
                  >
                    {service.title}
                  </h3>

                  {/* Descrição */}
                  <p 
                    className="text-gray-600 text-sm leading-relaxed mb-4"
                    itemProp="description"
                  >
                    {service.description}
                  </p>

                  {/* Benefícios */}
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <svg className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={service.url}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    itemProp="url"
                  >
                    Saiba Mais
                  </Link>
                </div>

                {/* Efeito de brilho ao hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${
                    hoveredIndex === index ? 'opacity-30' : ''
                  }`}
                  style={{
                    transform: hoveredIndex === index ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 1s ease-in-out'
                  }}
                />
              </div>

              {/* Schema estruturado para cada serviço */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": `${COMPANY_DATA.url}${service.url}`,
                    "name": service.title,
                    "description": service.description,
                    "provider": {
                      "@type": "Organization",
                      "name": COMPANY_DATA.name,
                      "url": COMPANY_DATA.url,
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": COMPANY_DATA.address.streetAddress,
                        "addressLocality": COMPANY_DATA.address.addressLocality,
                        "addressRegion": COMPANY_DATA.address.addressRegion,
                        "postalCode": COMPANY_DATA.address.postalCode,
                        "addressCountry": COMPANY_DATA.address.addressCountry
                      },
                      "telephone": COMPANY_DATA.contact.telephone
                    },
                    "serviceType": service.category,
                    "areaServed": {
                      "@type": "City",
                      "name": "São Paulo"
                    },
                    "image": `${COMPANY_DATA.url}${service.image}`,
                    "offers": {
                      "@type": "Offer",
                      "availability": "https://schema.org/InStock",
                      "priceCurrency": "BRL",
                      "priceRange": COMPANY_DATA.packages.priceRange
                    }
                  })
                }}
              />
            </div>
          ))}
        </div>

        {/* ========================================
            CTA FINAL
            ======================================== */}
        <div className="text-center mt-16">
          <p className="text-gray-700 mb-6 text-lg">
            Atendemos em nosso studio e também em <span className="font-semibold text-rose-600">domicílio</span> em toda São Paulo
          </p>
          
          <Link
            href="https://wa.me/5511977670498?text=Olá!%20Gostaria%20de%20conhecer%20mais%20sobre%20os%20serviços"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-rose-300 text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl hover:border-rose-400 transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Fale Conosco pelo WhatsApp
          </Link>
        </div>

      </div>

      {/* Schema ItemList para a lista completa de serviços */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Serviços do Studio Amendola Noivas",
            "description": "Lista completa de serviços de maquiagem e penteado profissional",
            "itemListElement": featuredServices.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "url": `${COMPANY_DATA.url}${service.url}`
              }
            }))
          })
        }}
      />
    </section>
  );
}