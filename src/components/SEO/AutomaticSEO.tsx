// src/components/SEO/AutomaticSEO.tsx
// Sistema que injeta TODOS os schemas automaticamente baseado no tipo de página

import { 
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateReviewSchema,
} from '@/lib/completeSchemaSystem';

/**
 * =====================================================
 * COMPONENTE PRINCIPAL - Injeta schemas automaticamente
 * =====================================================
 * 
 * USO:
 * <AutomaticSEO type="service" data={{...}} />
 * 
 * Gera TODOS os schemas necessários automaticamente!
 */

interface AutomaticSEOProps {
  type: 'service' | 'service-city' | 'blog' | 'portfolio' | 'faq' | 'page';
  data: {
    // Para SERVIÇOS
    serviceName?: string;
    serviceDescription?: string;
    servicePrice?: string;
    serviceUrl?: string;
    city?: string;
    state?: string;
    
    // Para BLOG
    title?: string;
    description?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    url?: string;
    keywords?: string[];
    
    // Para FAQ
    faqs?: Array<{ question: string; answer: string }>;
    
    // Para BREADCRUMBS (automático)
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
}

export default function AutomaticSEO({ type, data }: AutomaticSEOProps) {
  const schemas: Array<Record<string, unknown>> = [];

  // ==========================================
  // 1. BREADCRUMBS (sempre adiciona)
  // ==========================================
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(data.breadcrumbs));
  }

  // ==========================================
  // 2. SCHEMAS ESPECÍFICOS POR TIPO
  // ==========================================
  
  if (type === 'service' && data.serviceName) {
    // Schema de Serviço
    schemas.push(generateServiceSchema({
      name: data.serviceName,
      description: data.serviceDescription || '',
      price: data.servicePrice,
      url: data.serviceUrl || '',
      image: data.image || '/images/services/default.jpg',
    }));
  }

  if (type === 'service-city' && data.serviceName && data.city) {
    // Schema de Serviço + Localização
    schemas.push(generateServiceSchema({
      name: `${data.serviceName} em ${data.city}`,
      description: `${data.serviceDescription} em ${data.city}, ${data.state || 'SP'}`,
      price: data.servicePrice,
      url: data.serviceUrl || '',
      image: data.image || '/images/services/default.jpg',
    }));
  }

  if (type === 'blog' && data.title) {
    // Schema de Artigo
    schemas.push(generateArticleSchema({
      title: data.title,
      description: data.description || '',
      author: data.author || 'Studio Amendola',
      datePublished: data.datePublished || new Date().toISOString(),
      dateModified: data.dateModified || new Date().toISOString(),
      image: data.image || '/images/blog/default.jpg',
      url: data.url || '',
      keywords: data.keywords || [],
    }));
  }

  if (type === 'faq' && data.faqs && data.faqs.length > 0) {
    // Schema de FAQ
    schemas.push(generateFAQSchema(data.faqs));
  }

  // ==========================================
  // 3. INJETA NO HEAD
  // ==========================================
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${type}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

/**
 * =====================================================
 * HELPERS - Geram breadcrumbs automaticamente
 * =====================================================
 */

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
    { name: city, url: `/servicos/${serviceSlug}/${citySlug}` },
  ];
}

export function generateBlogBreadcrumbs(title: string, slug: string) {
  return [
    { name: 'Início', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: title, url: `/blog/${slug}` },
  ];
}