// src/types/seo.ts - Tipos para SEO e Schema.org

// Tipo para Schema.org JSON-LD
export type SchemaType = Record<string, unknown> | Array<Record<string, unknown>>;

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  schema?: SchemaType;
  noindex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ServiceSchema {
  name: string;
  description: string;
  image: string;
  price?: string;
  duration?: string;
  category: string;
}

export interface ReviewSchema {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

export interface LocalBusinessSchema {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  telephone: string;
  email?: string;
  priceRange: string;
  openingHours: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
  image: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  services: ServiceSchema[];
  reviews?: ReviewSchema[];
}