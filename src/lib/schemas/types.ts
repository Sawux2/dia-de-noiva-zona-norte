/**
 * TIPOS TYPESCRIPT PARA SCHEMAS
 * 
 * Define todos os tipos usados no sistema de Schema.org
 * Garante type-safety e autocomplete no VSCode
 */

// ========================================
// TIPOS BASE DO SCHEMA.ORG
// ========================================

/**
 * Tipo base para qualquer Schema
 */
export interface BaseSchema {
  "@context": "https://schema.org";
  "@type": string | string[];
  "@id"?: string;
}

/**
 * Schema de Organização
 */
  export interface OrganizationSchema extends BaseSchema {
  "@type": "Organization" | "LocalBusiness" | "BeautySalon" | "DaySpa" | ("Organization" | "LocalBusiness" | "BeautySalon" | "DaySpa")[];
  name: string;
  legalName?: string;
  description?: string;
  url: string;
  logo?: ImageObject | string;
  image?: ImageObject | ImageObject[] | string | string[];
  foundingDate?: string;
  address?: PostalAddress;
  geo?: GeoCoordinates;
  telephone?: string;
  email?: string;
  sameAs?: string[];
  openingHoursSpecification?: OpeningHoursSpecification[];
  priceRange?: string;
  areaServed?: Place | Place[];
  founder?: Person;
  employee?: Person[];
  aggregateRating?: AggregateRating;
  review?: Review[];
}

/**
 * Schema de Endereço
 */
export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

/**
 * Schema de Coordenadas Geográficas
 */
export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number | string;
  longitude: number | string;
}

/**
 * Schema de Horário de Funcionamento
 */
export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: DayOfWeek | DayOfWeek[];
  opens?: string;
  closes?: string;
  validFrom?: string;
  validThrough?: string;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/**
 * Schema de Lugar/Área Atendida
 */
export interface Place {
  "@type": "Place" | "City" | "State";
  name: string;
  address?: PostalAddress;
}

/**
 * Schema de Pessoa
 */
export interface Person {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  description?: string;
  image?: ImageObject | string;
  sameAs?: string[];
  worksFor?: Organization;
}

/**
 * Schema de Imagem
 */
export interface ImageObject {
  "@type": "ImageObject";
  url: string;
  width?: number | string;
  height?: number | string;
  caption?: string;
}

/**
 * Schema de Website
 */
export interface WebSiteSchema extends BaseSchema {
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  publisher?: Organization;
  potentialAction?: SearchAction;
  inLanguage?: string;
}

/**
 * Schema de Busca Interna
 */
export interface SearchAction {
  "@type": "SearchAction";
  target: {
    "@type": "EntryPoint";
    urlTemplate: string;
  };
  "query-input": string;
}

/**
 * Schema de Breadcrumb (Navegação)
 */
export interface BreadcrumbListSchema extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

export interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

/**
 * Schema de Serviço
 */
export interface ServiceSchema extends BaseSchema {
  "@type": "Service";
  name: string;
  description?: string;
  provider?: Organization;
  serviceType?: string;
  areaServed?: Place | Place[];
  offers?: Offer;
  image?: ImageObject | ImageObject[] | string | string[];
  aggregateRating?: AggregateRating;
  review?: Review[];
}

/**
 * Schema de Oferta
 */
export interface Offer {
  "@type": "Offer";
  priceCurrency?: string;
  price?: number | string;
  priceRange?: string;
  availability?: string;
  url?: string;
  validFrom?: string;
  priceSpecification?: PriceSpecification;
}

export interface PriceSpecification {
  "@type": "PriceSpecification";
  priceCurrency: string;
  price?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
}

/**
 * Schema de FAQ
 */
export interface FAQPageSchema extends BaseSchema {
  "@type": "FAQPage";
  mainEntity: Question[];
}

export interface Question {
  "@type": "Question";
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  "@type": "Answer";
  text: string;
}

/**
 * Schema de Artigo/Post de Blog
 */
export interface ArticleSchema extends BaseSchema {
  "@type": "Article" | "BlogPosting";
  headline: string;
  description?: string;
  image?: ImageObject | ImageObject[] | string | string[];
  author?: Person | Organization;
  publisher?: Organization;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage?: string;
  articleBody?: string;
  keywords?: string | string[];
  articleSection?: string;
}

/**
 * Schema de Vídeo
 */
export interface VideoObjectSchema extends BaseSchema {
  "@type": "VideoObject";
  name: string;
  description?: string;
  thumbnailUrl?: string | string[];
  uploadDate?: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  publisher?: Organization;
}

/**
 * Schema de Avaliação Agregada
 */
export interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: number | string;
  reviewCount: number | string;
  bestRating?: number | string;
  worstRating?: number | string;
}

/**
 * Schema de Avaliação Individual
 */
export interface Review {
  "@type": "Review";
  author: Person;
  datePublished?: string;
  reviewBody?: string;
  reviewRating: Rating;
}

export interface Rating {
  "@type": "Rating";
  ratingValue: number | string;
  bestRating?: number | string;
  worstRating?: number | string;
}

/**
 * Schema de Organização (tipo auxiliar)
 */
export interface Organization {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: ImageObject | string;
}

// ========================================
// TIPOS PARA USO NO HOOK
// ========================================

/**
 * Tipos de página que podem ter schemas específicos
 */
export type PageType =
  | "home"
  | "service"
  | "about"
  | "contact"
  | "blog"
  | "blog-post"
  | "faq"
  | "gallery"
  | "region"
  | "custom";

/**
 * Configuração do Schema Generator
 */
export interface SchemaConfig {
  pageType: PageType;
  title?: string;
  description?: string;
  image?: string;
  breadcrumbs?: BreadcrumbItem[];
  service?: ServiceData;
  faq?: FAQItem[];
  article?: ArticleData;
  video?: VideoData;
  customSchema?: BaseSchema[];
}

/**
 * Item de Breadcrumb
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Dados de Serviço
 */
export interface ServiceData {
  id: string;
  name: string;
  description: string;
  category?: string;
  image?: string;
  price?: {
    min?: number;
    max?: number;
    currency?: string;
    type?: string;
  };
}

/**
 * Item de FAQ
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Dados de Artigo
 */
export interface ArticleData {
  title: string;
  description?: string;
  image?: string;
  author?: {
    name: string;
    image?: string;
  };
  publishedDate: string;
  modifiedDate?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

/**
 * Dados de Vídeo
 */
export interface VideoData {
  title: string;
  description?: string;
  thumbnail?: string;
  uploadDate?: string;
  duration?: string;
  url?: string;
  embedUrl?: string;
}

/**
 * Retorno do Hook useSchemaGenerator
 */
export interface GeneratedSchemas {
  schemas: BaseSchema[];
  jsonLd: string;
}