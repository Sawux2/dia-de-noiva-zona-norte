// src/types/common.ts - Tipos comuns do projeto

export interface BusinessInfo {
  name: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube?: string;
  };
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price?: string;
  duration?: string;
  image: string;
  category: string;
  features: string[];
  keywords: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  date?: string;
}