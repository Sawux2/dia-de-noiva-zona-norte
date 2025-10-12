// src/lib/completeSchemaSystem.ts - Sistema COMPLETO de Schema.org para Google

import { BUSINESS_INFO, GEO_COORDINATES, AGGREGATE_RATING, OPENING_HOURS_SCHEMA } from '@/data/businessInfo';

const SITE_URL = 'https://studioamendola.com.br';

/**
 * =====================================================
 * 1. ORGANIZATION SCHEMA - Base da empresa
 * =====================================================
 * Rich Result: Logo, nome, contatos, redes sociais
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 600,
      height: 60,
    },
    image: `${SITE_URL}/images/studio-front.jpg`,
    description: BUSINESS_INFO.description,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.socialMedia.instagram.replace('@', '')}`,
      `https://facebook.com/${BUSINESS_INFO.socialMedia.facebook}`,
    ],
  };
}

/**
 * =====================================================
 * 2. LOCAL BUSINESS SCHEMA - Salão de Beleza
 * =====================================================
 * Rich Result: Estrelas, horários, mapa, telefone
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS_INFO.name,
    image: [
      `${SITE_URL}/images/studio-1.jpg`,
      `${SITE_URL}/images/studio-2.jpg`,
      `${SITE_URL}/images/studio-3.jpg`,
    ],
    url: SITE_URL, // Use 'url' para a URL completa
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: AGGREGATE_RATING.ratingValue,
      reviewCount: AGGREGATE_RATING.reviewCount,
      bestRating: AGGREGATE_RATING.bestRating,
      worstRating: AGGREGATE_RATING.worstRating,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Beleza',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Maquiagem',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Maquiagem de Noivas',
                description: 'Maquiagem profissional para noivas com teste incluso',
              },
            },
          ],
        },
      ],
    },
  };
}

/**
 * =====================================================
 * 3. SERVICE SCHEMA - Serviços específicos
 * =====================================================
 * Rich Result: Preço, duração, descrição detalhada
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string;
  duration?: string;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'BeautySalon',
      name: BUSINESS_INFO.name,
      '@id': `${SITE_URL}/#localbusiness`,
    },
    areaServed: {
      '@type': 'City',
      name: 'São Paulo',
    },
    offers: {
      '@type': 'Offer',
      price: service.price || 'Sob consulta',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${service.url}`,
    },
    image: service.image,
    url: `${SITE_URL}${service.url}`,
  };
}

/**
 * =====================================================
 * 4. REVIEW SCHEMA - Avaliações/Depoimentos
 * =====================================================
 * Rich Result: Estrelas individuais nos resultados
 */
export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'BeautySalon',
      name: BUSINESS_INFO.name,
      '@id': `${SITE_URL}/#localbusiness`,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  };
}

/**
 * =====================================================
 * 5. FAQ SCHEMA - Perguntas Frequentes
 * =====================================================
 * Rich Result: Accordion expandido no Google
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * =====================================================
 * 6. BREADCRUMB SCHEMA - Navegação
 * =====================================================
 * Rich Result: Breadcrumbs nos resultados de busca
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * =====================================================
 * 7. ARTICLE SCHEMA - Blog Posts
 * =====================================================
 * Rich Result: Artigos com imagem, data, autor
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  keywords: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${article.image}`,
      width: 1200,
      height: 630,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
      url: `${SITE_URL}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${article.url}`,
    },
    keywords: article.keywords.join(', '),
  };
}

/**
 * =====================================================
 * 8. IMAGE SCHEMA - Imagens
 * =====================================================
 * Rich Result: Imagens indexadas no Google Images
 */
export function generateImageSchema(image: {
  url: string;
  caption: string;
  width: number;
  height: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${image.url}`,
    url: `${SITE_URL}${image.url}`,
    caption: image.caption,
    width: image.width,
    height: image.height,
    encodingFormat: 'image/jpeg',
  };
}

/**
 * =====================================================
 * 9. VIDEO SCHEMA - Vídeos
 * =====================================================
 * Rich Result: Vídeos nos resultados de busca
 */
export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // Formato: PT1M30S (1min 30seg)
  contentUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: `${SITE_URL}${video.thumbnailUrl}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.contentUrl,
  };
}

/**
 * =====================================================
 * 10. WEBSITE SCHEMA - Site Principal
 * =====================================================
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/busca?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'pt-BR',
  };
}