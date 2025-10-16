/**
 * STUDIO AMENDOLA NOIVAS - Dados Centralizados
 * 
 * Este arquivo contém TODAS as informações da empresa.
 * Qualquer schema vai buscar dados daqui automaticamente.
 * 
 * ⚠️ IMPORTANTE: Altere apenas este arquivo para atualizar 
 * informações em todo o site!
 */

export const COMPANY_DATA = {
  // ========================================
  // INFORMAÇÕES BÁSICAS
  // ========================================
  name: "Studio Amendola Noivas",
  legalName: "Studio Amendola Noivas", // Razão social (ajuste se diferente)
  foundingDate: "2020",
  
  description: "Studio especializado em maquiagem e penteado profissional para noivas, madrinhas, debutantes e eventos em geral. Oferecemos spa day completo com dia de noiva personalizado.",
  
  // Palavras-chave para SEO
  keywords: [
    "maquiagem para noivas",
    "penteado para noivas",
    "dia de noiva",
    "spa day",
    "maquiagem para madrinhas",
    "maquiagem para debutantes",
    "studio de beleza São Paulo",
  ],

  // ========================================
  // LOCALIZAÇÃO E CONTATO
  // ========================================
  address: {
    streetAddress: "Avenida Julio Buono, 2386",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "02212-001",
    addressCountry: "BR",
    neighborhood: "Vila Nivi", // Não é padrão Schema.org mas útil
  },

  geo: {
    latitude: null, // TODO: Adicionar coordenadas depois
    longitude: null, // Melhora resultados locais no Google
  },

  contact: {
    telephone: "+55-11-(11) 97767-0498", // ⚠️ ADICIONAR TELEFONE
    whatsapp: "+55-11-(11) 97767-0498", // ⚠️ ADICIONAR WHATSAPP (formato: +5511999999999)
    email: "priscilaamendola.sa1990@gmail.com",
    contactPreference: "whatsapp", // Preferência de contato
  },

  // ========================================
  // URLS E REDES SOCIAIS
  // ========================================
  url: "https://studioamendollanoivas.com.br",
  logo: "https://studioamendollanoivas.com.br/logo.png", // ⚠️ AJUSTAR URL da logo
  
  socialMedia: {
    instagram: "https://www.instagram.com/amendolanoivas_/",
    facebook: "https://www.facebook.com/studioamendolla/",
    // youtube: "", // Adicione se criar canal
    // pinterest: "", // Útil para área de beleza
  },

  // ========================================
  // HORÁRIO DE FUNCIONAMENTO
  // ========================================
  // Como é por agendamento, vamos usar "By Appointment Only"
  openingHours: {
    type: "ByAppointmentOnly",
    description: "Atendimento mediante agendamento prévio todos os dias da semana",
    // Se quiser especificar horários flexíveis depois:
    schedule: [
      // Exemplo: "Monday-Sunday 08:00-20:00"
      // Como é flexível, deixamos genérico
    ],
  },

  // ========================================
  // PROPRIETÁRIA E EQUIPE
  // ========================================
  owner: {
    name: "Priscila Amendola",
    jobTitle: "Maquiadora e Proprietária",
    experience: "Mais de 7 anos de experiência em maquiagem profissional",
    description: "Especialista em maquiagem para noivas com formação profissional e constante aprimoramento técnico",
    image: null, // URL da foto da Priscila (opcional, mas ótimo para SEO)
  },

  // ========================================
  // SERVIÇOS PRINCIPAIS
  // ========================================
  services: [
    {
      id: "maquiagem-noivas",
      name: "Maquiagem para Noivas",
      description: "Maquiagem profissional personalizada para o dia mais especial",
      category: "BeautySalon",
    },
    {
      id: "penteado-noivas",
      name: "Penteado para Noivas",
      description: "Penteados elegantes e duradouros para noivas",
      category: "BeautySalon",
    },
    {
      id: "dia-de-noiva",
      name: "Dia de Noiva Completo",
      description: "Experiência completa de spa day com maquiagem, penteado e relaxamento",
      category: "DaySpa",
    },
    {
      id: "maquiagem-madrinhas",
      name: "Maquiagem para Madrinhas",
      description: "Maquiagem profissional para madrinhas de casamento",
      category: "BeautySalon",
    },
    {
      id: "maquiagem-debutantes",
      name: "Maquiagem para Debutantes",
      description: "Maquiagem especial para festa de 15 anos",
      category: "BeautySalon",
    },
    {
      id: "maquiagem-eventos",
      name: "Maquiagem para Eventos",
      description: "Maquiagem profissional para festas e eventos em geral",
      category: "BeautySalon",
    },
    {
      id: "massagem-relaxante",
      name: "Massagem Relaxante",
      description: "Massagem para relaxamento no dia de noiva",
      category: "DaySpa",
    },
    {
      id: "escalda-pes",
      name: "Escalda Pés",
      description: "Tratamento relaxante para os pés",
      category: "DaySpa",
    },
    {
      id: "banho-imersao",
      name: "Banho de Imersão",
      description: "Banho relaxante de imersão em banheira",
      category: "DaySpa",
    },
  ],

  // ========================================
  // PACOTES (sem preços específicos)
  // ========================================
  packages: {
    hasPackages: true,
    description: "Oferecemos pacotes personalizados (Bronze, Prata, Ouro, Plus) adaptados às necessidades de cada cliente",
    types: ["Bronze", "Prata", "Ouro", "Plus"],
    priceRange: "$$", // Escala de preço ($ a $$$$)
  },

  // ========================================
  // CARACTERÍSTICAS DO NEGÓCIO
  // ========================================
  businessType: {
    primary: "BeautySalon", // Schema.org type
    secondary: "DaySpa",
    industry: "Beauty & Personal Care",
  },

  features: [
    "Atendimento personalizado",
    "Agendamento flexível",
    "Produtos profissionais de alta qualidade",
    "Experiência completa de dia de noiva",
    "Ambiente relaxante e acolhedor",
  ],

  // ========================================
  // ÁREAS DE COBERTURA
  // ========================================
  serviceArea: {
    city: "São Paulo",
    state: "SP",
    regions: ["Vila Nivi", "Zona Norte", "Zona Oeste", "Zona Leste", "Zona Sul"], // Ajuste conforme áreas de atendimento
    // Se atende em domicílio, adicionar:
    // mobileService: true,
  },

  // ========================================
  // MÍDIA E CONTEÚDO
  // ========================================
  media: {
    hasVideos: true,
    videoSource: "instagram", // videos estão no Instagram
    hasGallery: true,
    hasBlog: false, // Será implementado futuramente
    hasTestimonials: false, // Será implementado futuramente
  },

  // ========================================
  // CONFIGURAÇÕES DE SCHEMA
  // ========================================
  schemaConfig: {
    enableOrganization: true,
    enableLocalBusiness: true,
    enableWebSite: true,
    enableBreadcrumb: true,
    enableService: true,
    enableFAQ: true, // Por página
    enableVideoObject: true,
    enableReview: false, // Ativar quando implementar sistema de avaliações
  },
} as const;

// ========================================
// TIPOS TYPESCRIPT (autocomplete no VSCode!)
// ========================================
export type CompanyData = typeof COMPANY_DATA;
export type Service = typeof COMPANY_DATA.services[number];
export type SocialMediaPlatform = keyof typeof COMPANY_DATA.socialMedia;