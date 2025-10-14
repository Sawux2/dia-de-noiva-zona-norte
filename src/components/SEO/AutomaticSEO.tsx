// src/components/SEO/AutomaticSEO.tsx
'use client';

import { useEffect } from 'react';

interface ServiceData {
  name: string;
  description: string;
  price?: string;
  url: string;
  image?: string;
}

interface ArticleData {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  keywords: string[];
}

interface AutomaticSEOProps {
  type: 'service' | 'service-city' | 'blog' | 'portfolio' | 'faq' | 'page';
  data: {
    serviceName?: string;
    serviceDescription?: string;
    servicePrice?: string;
    serviceUrl?: string;
    city?: string;
    state?: string;
    title?: string;
    description?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    url?: string;
    keywords?: string[];
    faqs?: Array<{ question: string; answer: string }>;
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
  debug?: boolean;
}

const generateServiceSchema = (data: ServiceData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    ...(data.price && {
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: 'BRL'
      }
    }),
    url: data.url,
    ...(data.image && { image: data.image })
  };
};

const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

const generateArticleSchema = (data: ArticleData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    image: data.image,
    url: data.url,
    ...(data.keywords && data.keywords.length > 0 && {
      keywords: data.keywords.join(', ')
    })
  };
};

export default function AutomaticSEO({ type, data, debug = false }: AutomaticSEOProps) {
  useEffect(() => {
    const schemas: Array<Record<string, unknown>> = [];

    if (!data) {
      if (debug) console.error('❌ AutomaticSEO: data está undefined');
      return;
    }

    // BREADCRUMBS
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
      try {
        const breadcrumbSchema = generateBreadcrumbSchema(data.breadcrumbs);
        schemas.push(breadcrumbSchema);
        if (debug) console.log('📍 Breadcrumb Schema:', breadcrumbSchema);
      } catch (error) {
        if (debug) console.error('❌ Erro breadcrumb:', error);
      }
    }

    // SERVIÇO NORMAL
    if (type === 'service' && data.serviceName) {
      const serviceSchema = generateServiceSchema({
        name: data.serviceName,
        description: data.serviceDescription || `Serviço de ${data.serviceName} - Studio Amendola`,
        price: data.servicePrice,
        url: data.serviceUrl || (typeof window !== 'undefined' ? window.location.href : ''),
        image: data.image || '/images/services/default.jpg',
      });
      schemas.push(serviceSchema);
      if (debug) console.log('🔧 Service Schema:', serviceSchema);
    }

    // SERVIÇO + CIDADE
    if (type === 'service-city' && data.serviceName && data.city) {
      const serviceCitySchema = generateServiceSchema({
        name: `${data.serviceName} em ${data.city}`,
        description: `${data.serviceDescription || data.serviceName} em ${data.city}, ${data.state || 'SP'} - Studio Amendola`,
        price: data.servicePrice,
        url: data.serviceUrl || '',
        image: data.image || '/images/services/default.jpg',
      });
      schemas.push(serviceCitySchema);
      if (debug) console.log('🏙️ Service City Schema:', serviceCitySchema);
    }

    // ARTIGO/BLOG
    if (type === 'blog' && data.title) {
      const articleSchema = generateArticleSchema({
        title: data.title,
        description: data.description || '',
        author: data.author || 'Studio Amendola',
        datePublished: data.datePublished || new Date().toISOString(),
        dateModified: data.dateModified || new Date().toISOString(),
        image: data.image || '/images/blog/default.jpg',
        url: data.url || '',
        keywords: data.keywords || [],
      });
      schemas.push(articleSchema);
      if (debug) console.log('📝 Article Schema:', articleSchema);
    }

    // FAQ
    if (type === 'faq' && data.faqs && data.faqs.length > 0) {
      const faqSchema = generateFAQSchema(data.faqs);
      schemas.push(faqSchema);
      if (debug) console.log('❓ FAQ Schema:', faqSchema);
    }

    // DEBUG
    if (debug) {
      console.group('🚀 AUTOMATIC SEO DEBUG');
      console.log('📄 Tipo de Página:', type);
      console.log('📊 Total de Schemas Gerados:', schemas.length);
      console.log('🔍 Dados Recebidos:', data);
      console.log('🎯 Schemas:', schemas);
      if (schemas.length === 0) {
        console.warn('⚠️ NENHUM SCHEMA GERADO! Verifique os dados.');
      }
      console.groupEnd();
    }

    // INJETA OS SCHEMAS NO HEAD
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.id = `schema-${type}-${index}-${Date.now()}`;
      document.head.appendChild(script);
    });

  }, [type, data, debug]);

  return null;
}

export function generateServiceBreadcrumbs(serviceName: string, serviceSlug: string) {
  return [
    { name: 'Início', url: '/' },
    { name: 'Serviços', url: '/servicos' },
    { name: serviceName, url: `/servicos/${serviceSlug}` },
  ];
}

export function generateServiceCityBreadcrumbs(
  serviceName: string, 
  serviceSlug: string, 
  city: string,
  citySlug: string
) {
  return [
    { name: 'Início', url: '/' },
    { name: 'Serviços', url: '/servicos' },
    { name: serviceName, url: `/servicos/${serviceSlug}` },
    { name: `${serviceName} em ${city}`, url: `/servicos/${serviceSlug}/${citySlug}` },
  ];
}

export function generateBlogBreadcrumbs(title: string, slug: string) {
  return [
    { name: 'Início', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: title, url: `/blog/${slug}` },
  ];
}

export function generatePortfolioBreadcrumbs(projectName: string, projectSlug: string) {
  return [
    { name: 'Início', url: '/' },
    { name: 'Portfólio', url: '/portfolio' },
    { name: projectName, url: `/portfolio/${projectSlug}` },
  ];
}