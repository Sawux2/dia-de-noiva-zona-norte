// src/lib/schemaGenerator.ts

// Dados fictícios - você pode substituir por dados reais de uma API ou CMS
const siteData = {
  name: "Studio Amendola",
  url: "https://studioamendola.com",
  logo: "https://studioamendola.com/images/logo.png",
  description: "Studio Amendola - Design de sobrancelhas profissional, micropigmentação e cuidados estéticos.",
};

// Função para gerar breadcrumbs baseado na pathname
function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    let name = path.replace(/-/g, ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return { name, url };
  });
  // Adiciona a página inicial
  breadcrumbs.unshift({ name: 'Início', url: '/' });
  return breadcrumbs;
}

// Schema de organização (para todas as páginas)
function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: siteData.name,
    url: siteData.url,
    logo: siteData.logo,
    description: siteData.description,
    // Adicione mais detalhes como telefone, endereço, etc.
  };
}

// Schema de breadcrumb
function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: siteData.url + breadcrumb.url,
    })),
  };
}

// Schema de página de serviço
function generateServiceSchema(serviceName: string, serviceDescription: string, servicePrice?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    ...(servicePrice && {
      offers: {
        '@type': 'Offer',
        price: servicePrice,
        priceCurrency: 'BRL',
      },
    }),
    provider: {
      '@type': 'BeautySalon',
      name: siteData.name,
    },
  };
}

// Schema de artigo (blog)
function generateArticleSchema(articleData: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.title,
    description: articleData.description,
    author: {
      '@type': 'Person',
      name: articleData.author,
    },
    datePublished: articleData.datePublished,
    dateModified: articleData.dateModified,
    image: articleData.image,
    publisher: {
      '@type': 'Organization',
      name: siteData.name,
      logo: {
        '@type': 'ImageObject',
        url: siteData.logo,
      },
    },
  };
}

// Schema de FAQ
function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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

// Função principal que gera todos os schemas baseados na URL
export function generateSchemas(pathname: string) {
  const schemas = [];

  // Schema de organização (sempre adiciona)
  schemas.push(generateOrganizationSchema());

  // Breadcrumbs (para todas as páginas exceto a home)
  if (pathname !== '/') {
    const breadcrumbs = generateBreadcrumbs(pathname);
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Schemas específicos por tipo de página
  if (pathname.startsWith('/servicos/')) {
    // Página de serviço
    const serviceSlug = pathname.split('/servicos/')[1];
    const serviceName = serviceSlug ? serviceSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : 'Serviço';
    
    schemas.push(generateServiceSchema(serviceName, `Descrição do serviço ${serviceName}`, 'Consulte'));
  } else if (pathname.startsWith('/blog/')) {
    // Página de blog
    // Aqui você pode buscar os dados reais do artigo
    schemas.push(generateArticleSchema({
      title: 'Título do Artigo',
      description: 'Descrição do artigo',
      author: 'Studio Amendola',
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      image: '/images/blog-image.jpg',
    }));
  } else if (pathname === '/faq') {
    // Página de FAQ
    // Aqui você pode buscar as FAQs reais
    schemas.push(generateFAQSchema([
      { question: 'Pergunta 1?', answer: 'Resposta 1.' },
      { question: 'Pergunta 2?', answer: 'Resposta 2.' },
    ]));
  }

  return schemas;
}