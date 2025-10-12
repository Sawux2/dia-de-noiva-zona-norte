// src/types/service.ts - Tipos específicos de serviços

export interface ServiceCategory {
  slug: string;
  name: string;
  icon?: string;
  description: string;
}

export interface ServicePageData {
  service: string;
  city?: string;
  title: string;
  description: string;
  h1: string;
  content: {
    intro: string;
    benefits: string[];
    process: string[];
    faq: Array<{
      question: string;
      answer: string;
    }>;
  };
  relatedServices: string[];
  gallery?: string[];
}

export interface CityData {
  slug: string;
  name: string;
  state: string;
  neighborhoods?: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'maquiagem-noivas',
    name: 'Maquiagem de Noivas',
    description: 'Maquiagem especial para o dia mais importante',
  },
  {
    slug: 'maquiagem-social',
    name: 'Maquiagem Social',
    description: 'Para eventos e ocasiões especiais',
  },
  {
    slug: 'maquiagem-festas',
    name: 'Maquiagem para Festas',
    description: 'Make perfeita para suas celebrações',
  },
  {
    slug: 'penteados',
    name: 'Penteados',
    description: 'Penteados elegantes e modernos',
  },
  {
    slug: 'penteados-noivas',
    name: 'Penteados para Noivas',
    description: 'Cabelos perfeitos para noivas',
  },
];