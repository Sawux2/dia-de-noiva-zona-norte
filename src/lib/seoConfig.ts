// src/lib/seoConfig.ts - Configurações centralizadas de SEO

export const SEO_CONFIG = {
  siteName: 'Studio Amendola Noivas',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://studioamendola.com.br',
  defaultTitle: 'Studio Amendola - Maquiagem e Penteados para Noivas em São Paulo',
  defaultDescription: 'Especialistas em maquiagem e penteados para noivas, madrinhas, debutantes e eventos especiais. Profissionais qualificados, atendimento personalizado e localização privilegiada em São Paulo.',
  defaultKeywords: [
    'maquiagem de noivas são paulo',
    'penteado de noiva',
    'maquiadora profissional',
    'salão de beleza para noivas',
    'studio amendola',
    'maquiagem social',
    'penteados para festas',
    'maquiagem madrinhas',
    'penteados elegantes',
  ],
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@amendolanoivas_',
  locale: 'pt_BR',
  themeColor: '#c9ad8e', // champagne-400
};