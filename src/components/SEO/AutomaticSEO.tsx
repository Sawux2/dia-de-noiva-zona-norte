// src/components/SEO/AutomaticSEO.tsx
import Head from 'next/head';

/**
 * =====================================================
 * SISTEMA COMPLETO DE SCHEMAS AUTOMÁTICOS
 * =====================================================
 */

// =====================================================
// TIPOS E INTERFACES
// =====================================================

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
    
    // Para BREADCRUMBS
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
  debug?: boolean;
}

// =====================================================
// FUNÇÕES DE SCHEMA (REMOVIDA A FUNÇÃO NÃO UTILIZADA)
// =====================================================

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

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function AutomaticSEO({ type, data, debug = false }: AutomaticSEOProps) {
  const schemas: Array<Record<string, unknown>> = [];

  // ==========================================
  // VALIDAÇÃO DE DADOS BÁSICA
  // ==========================================
  if (!data) {
    if (debug) console.error('❌ AutomaticSEO: data está undefined');
    return null;
  }

  // ==========================================
  // 1. BREADCRUMBS (sempre adiciona se existir)
  // ==========================================
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    try {
      const breadcrumbSchema = generateBreadcrumbSchema(data.breadcrumbs);
      schemas.push(breadcrumbSchema);
      
      if (debug) {
        console.log('📍 Breadcrumb Schema Gerado:', breadcrumbSchema);
      }
    } catch (error) {
      if (debug) console.error('❌ Erro ao gerar breadcrumb schema:', error);
    }
  }

  // ==========================================
  // 2. SCHEMAS ESPECÍFICOS POR TIPO
  // ==========================================
  
  try {
    // SERVIÇO NORMAL
    if (type === 'service' && data.serviceName) {
      const serviceSchema = generateServiceSchema({
        name: data.serviceName,
        description: data.serviceDescription || `Serviço de ${data.serviceName} - Studio Amendola`,
        price: data.servicePrice,
        url: data.serviceUrl || typeof window !== 'undefined' ? window.location.href : '',
        image: data.image || '/images/services/default.jpg',
      });
      schemas.push(serviceSchema);
      
      if (debug) {
        console.log('🔧 Service Schema Gerado:', serviceSchema);
      }
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
      
      if (debug) {
        console.log('🏙️ Service City Schema Gerado:', serviceCitySchema);
      }
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
      
      if (debug) {
        console.log('📝 Article Schema Gerado:', articleSchema);
      }
    }

    // FAQ
    if (type === 'faq' && data.faqs && data.faqs.length > 0) {
      const faqSchema = generateFAQSchema(data.faqs);
      schemas.push(faqSchema);
      
      if (debug) {
        console.log('❓ FAQ Schema Gerado:', faqSchema);
      }
    }

    // PÁGINA GENÉRICA (apenas breadcrumbs se existirem)
    if (type === 'page' && debug) {
      console.log('📄 Página genérica - apenas breadcrumbs se disponíveis');
    }

  } catch (error) {
    if (debug) console.error('❌ Erro ao gerar schemas:', error);
  }

  // ==========================================
  // 3. DEBUG: RELATÓRIO COMPLETO
  // ==========================================
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

  // ==========================================
  // 4. INJEÇÃO NO HEAD (CORRETA)
  // ==========================================
  if (schemas.length === 0) {
    if (debug) {
      console.warn('⚠️ AutomaticSEO: Nenhum schema gerado para', type);
    }
    return null;
  }

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${type}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </Head>
  );
}

// =====================================================
// FUNÇÕES AUXILIARES PARA BREADCRUMBS
// =====================================================

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
