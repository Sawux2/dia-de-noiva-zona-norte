/**
 * USE SCHEMA GENERATOR
 * 
 * Hook principal que gera schemas automaticamente baseado no tipo de página.
 * 
 * USO:
 * const { schemas, jsonLd } = useSchemaGenerator({
 *   pageType: 'service',
 *   service: { ... }
 * });
 */

import { useMemo } from 'react';
import { COMPANY_DATA } from './companyData';
import type {
  SchemaConfig,
  GeneratedSchemas,
  BaseSchema,
  OrganizationSchema,
  WebSiteSchema,
  BreadcrumbListSchema,
  ServiceSchema,
  FAQPageSchema,
  ArticleSchema,
  VideoObjectSchema,
  PostalAddress,
  GeoCoordinates,
  Place,
} from './types';

export function useSchemaGenerator(config: SchemaConfig): GeneratedSchemas {
  const schemas = useMemo(() => {
    const generatedSchemas: BaseSchema[] = [];

    // ========================================
    // 1. ORGANIZATION SCHEMA (sempre presente)
    // ========================================
    if (COMPANY_DATA.schemaConfig.enableOrganization) {
      generatedSchemas.push(generateOrganizationSchema());
    }

    // ========================================
    // 2. WEBSITE SCHEMA (sempre presente)
    // ========================================
    if (COMPANY_DATA.schemaConfig.enableWebSite) {
      generatedSchemas.push(generateWebSiteSchema());
    }

    // ========================================
    // 3. BREADCRUMB (se fornecido)
    // ========================================
    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      generatedSchemas.push(generateBreadcrumbSchema(config.breadcrumbs));
    }

    // ========================================
    // 4. SCHEMAS ESPECÍFICOS POR TIPO DE PÁGINA
    // ========================================
    switch (config.pageType) {
      case 'service':
        if (config.service) {
          generatedSchemas.push(generateServiceSchema(config.service));
        }
        break;

      case 'blog-post':
        if (config.article) {
          generatedSchemas.push(generateArticleSchema(config.article));
        }
        break;

      case 'faq':
      case 'home':
      case 'about':
        // FAQ pode estar em qualquer página
        if (config.faq && config.faq.length > 0) {
          generatedSchemas.push(generateFAQSchema(config.faq));
        }
        break;

      default:
        break;
    }

    // ========================================
    // 5. VIDEO (se fornecido)
    // ========================================
    if (config.video) {
      generatedSchemas.push(generateVideoSchema(config.video));
    }

    // ========================================
    // 6. SCHEMAS CUSTOMIZADOS
    // ========================================
    if (config.customSchema) {
      generatedSchemas.push(...config.customSchema);
    }

    return generatedSchemas;
  }, [config]);

  // Converte para JSON-LD
  const jsonLd = useMemo(() => {
    return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
  }, [schemas]);

  return { schemas, jsonLd };
}

// ========================================
// FUNÇÕES GERADORAS DE SCHEMAS
// ========================================

/**
 * Gera Schema de Organização/LocalBusiness
 */
function generateOrganizationSchema(): OrganizationSchema {
  const { name, legalName, description, url, logo, contact, socialMedia, owner, businessType, packages } = COMPANY_DATA;

  // Monta lista de redes sociais
  const sameAs = Object.values(socialMedia).filter(Boolean) as string[];

  // Schema base
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': businessType.secondary ? [businessType.primary, businessType.secondary] : businessType.primary,
    '@id': `${url}#organization`,
    name,
    legalName: legalName || name,
    description,
    url,
    telephone: contact.telephone,
    email: contact.email,
    priceRange: packages.priceRange,
  };

  // Logo
  if (logo) {
    schema.logo = {
      '@type': 'ImageObject',
      url: logo,
    };
  }

  // Endereço
  schema.address = generateAddressSchema();

  // Coordenadas (se disponível)
  if (COMPANY_DATA.geo.latitude && COMPANY_DATA.geo.longitude) {
    schema.geo = generateGeoSchema();
  }

  // Redes sociais
  if (sameAs.length > 0) {
    schema.sameAs = sameAs;
  }

  // Fundador/Proprietário
  if (owner) {
    schema.founder = {
      '@type': 'Person',
      name: owner.name,
      jobTitle: owner.jobTitle,
      description: owner.description,
    };

    if (owner.image) {
      schema.founder.image = owner.image;
    }
  }

  // Horário de funcionamento (por agendamento)
  if (COMPANY_DATA.openingHours.type === 'ByAppointmentOnly') {
    // Para "by appointment only", podemos usar uma descrição
    // Ou deixar sem openingHoursSpecification
  }

  // Área de cobertura
  schema.areaServed = generateAreaServedSchema();

  return schema;
}

/**
 * Gera Schema de WebSite
 */
function generateWebSiteSchema(): WebSiteSchema {
  const { name, url, description } = COMPANY_DATA;

  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name,
    url,
    description,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name,
      url,
    },
  };

  // TODO: Adicionar SearchAction quando tiver busca interna
  // schema.potentialAction = {
  //   '@type': 'SearchAction',
  //   target: {
  //     '@type': 'EntryPoint',
  //     urlTemplate: `${url}/busca?q={search_term_string}`
  //   },
  //   'query-input': 'required name=search_term_string'
  // };

  return schema;
}

/**
 * Gera Schema de Breadcrumb
 */
function generateBreadcrumbSchema(breadcrumbs: SchemaConfig['breadcrumbs']): BreadcrumbListSchema {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    throw new Error('Breadcrumbs são obrigatórios para este schema');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Gera Schema de Serviço
 */
function generateServiceSchema(serviceData: NonNullable<SchemaConfig['service']>): ServiceSchema {
  const { url } = COMPANY_DATA;

  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData.name,
    description: serviceData.description,
    serviceType: serviceData.category,
    provider: {
      '@type': 'Organization',
      name: COMPANY_DATA.name,
      url,
    },
    areaServed: generateAreaServedSchema(),
  };

  // Imagem do serviço
  if (serviceData.image) {
    schema.image = serviceData.image;
  }

  // Preço (se disponível)
  if (serviceData.price) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: serviceData.price.currency || 'BRL',
      availability: 'https://schema.org/InStock',
    };

    if (serviceData.price.type === 'range' && serviceData.price.min && serviceData.price.max) {
      schema.offers.priceSpecification = {
        '@type': 'PriceSpecification',
        priceCurrency: 'BRL',
        minPrice: serviceData.price.min,
        maxPrice: serviceData.price.max,
      };
    } else if (serviceData.price.min) {
      schema.offers.price = serviceData.price.min;
    }
  }

  return schema;
}

/**
 * Gera Schema de FAQ
 */
function generateFAQSchema(faqItems: NonNullable<SchemaConfig['faq']>): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Gera Schema de Artigo/Blog Post
 */
function generateArticleSchema(articleData: NonNullable<SchemaConfig['article']>): ArticleSchema {
  const { url, name, logo } = COMPANY_DATA;

  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: articleData.title,
    description: articleData.description,
    datePublished: articleData.publishedDate,
    dateModified: articleData.modifiedDate || articleData.publishedDate,
    publisher: {
      '@type': 'Organization',
      name,
      url,
      logo: logo
        ? {
            '@type': 'ImageObject',
            url: logo,
          }
        : undefined,
    },
  };

  // Autor
  if (articleData.author) {
    schema.author = {
      '@type': 'Person',
      name: articleData.author.name,
      image: articleData.author.image,
    };
  } else {
    // Se não tiver autor, usa a organização
    schema.author = {
      '@type': 'Organization',
      name,
      url,
    };
  }

  // Imagem do artigo
  if (articleData.image) {
    schema.image = articleData.image;
  }

  // Conteúdo
  if (articleData.content) {
    schema.articleBody = articleData.content;
  }

  // Categoria/Seção
  if (articleData.category) {
    schema.articleSection = articleData.category;
  }

  // Tags/Keywords
  if (articleData.tags) {
    schema.keywords = articleData.tags.join(', ');
  }

  return schema;
}

/**
 * Gera Schema de Vídeo
 */
function generateVideoSchema(videoData: NonNullable<SchemaConfig['video']>): VideoObjectSchema {
  const { name, url } = COMPANY_DATA;

  const schema: VideoObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData.title,
    description: videoData.description,
    thumbnailUrl: videoData.thumbnail,
    uploadDate: videoData.uploadDate,
    publisher: {
      '@type': 'Organization',
      name,
      url,
    },
  };

  // URLs do vídeo
  if (videoData.url) {
    schema.contentUrl = videoData.url;
  }

  if (videoData.embedUrl) {
    schema.embedUrl = videoData.embedUrl;
  }

  // Duração (formato ISO 8601: PT1H30M)
  if (videoData.duration) {
    schema.duration = videoData.duration;
  }

  return schema;
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Gera Schema de Endereço
 */
function generateAddressSchema(): PostalAddress {
  const { address } = COMPANY_DATA;

  return {
    '@type': 'PostalAddress',
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  };
}

/**
 * Gera Schema de Coordenadas Geográficas
 */
function generateGeoSchema(): GeoCoordinates {
  const { geo } = COMPANY_DATA;

  return {
    '@type': 'GeoCoordinates',
    latitude: geo.latitude!,
    longitude: geo.longitude!,
  };
}

/**
 * Gera Schema de Área Atendida
 */
function generateAreaServedSchema(): Place[] {
  const { serviceArea } = COMPANY_DATA;

  const areas: Place[] = [
    {
      '@type': 'City',
      name: serviceArea.city,
    },
    {
      '@type': 'State',
      name: serviceArea.state,
    },
  ];

  // Adiciona regiões específicas se houver
  if (serviceArea.regions && serviceArea.regions.length > 0) {
    serviceArea.regions.forEach((region) => {
      areas.push({
        '@type': 'Place',
        name: region,
      });
    });
  }

  return areas;
}