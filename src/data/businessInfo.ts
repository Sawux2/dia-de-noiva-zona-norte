// src/data/businessInfo.ts - Informações do Studio Amendola

import type { BusinessInfo } from '@/types/common';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Studio Amendola Noivas',
  description: 'Especialistas em maquiagem e penteados para noivas, madrinhas , debutantes , eventos sociais e ocasiões especiais em São Paulo',
  phone: '(11) 97767-0498', // ALTERE AQUI
  email: 'priscilaamendola.sa@hotmail.com.br', // ALTERE AQUI
  whatsapp: '5511977670498', // ALTERE AQUI (código do país + DDD + número)
  address: {
    street: 'Avenida Julio Buono 2386', // ALTERE AQUI
    city: 'São Paulo',
    state: 'SP',
    postalCode: '02201-002', // ALTERE AQUI
    country: 'Brasil',
  },
  socialMedia: {
    instagram: '@amendolanoivas_', // ALTERE AQUI
    facebook: 'studioamendola', // ALTERE AQUI
    youtube: '', // OPCIONAL
  },
  openingHours: {
    weekdays: 'Quarta a Sexta: 9h às 19h',
    saturday: 'Sábado: 9h às 17h',
    sunday: 'Domingo: 9h às 17h',
  },
};

// Horários estruturados para Schema.org
export const OPENING_HOURS_SCHEMA = [
  'Wednesday-Friday: 09:00-19:00',  // ← Corrigido para Quarta-Sexta
  'Saturday: 09:00-17:00',
  'Sunday: 09:00-17:00',
];

// Coordenadas GPS (para Google Maps e Schema.org)
export const GEO_COORDINATES = {
  latitude: -23.4824883,  // Av. Julio Buono, 2386
  longitude: -46.5895653, // Vila Gustavo - São Paulo, SP
};

// Avaliações agregadas (atualize com dados reais)
export const AGGREGATE_RATING = {
  ratingValue: 4.9,
  reviewCount: 127,
  bestRating: 5,
  worstRating: 1,
};