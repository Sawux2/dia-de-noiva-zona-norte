/**
 * TIPOS DO SISTEMA SaaS - Studio Amendola Noivas
 * Tipos compartilhados entre blog, leads e analytics
 */

// ========================================
// BLOG POSTS
// ========================================
export type PostStatus = 'draft' | 'published' | 'archived';
export type PostCategory =
  | 'noivas'
  | 'madrinhas'
  | 'debutantes'
  | 'eventos'
  | 'dicas'
  | 'spa-day';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: PostCategory;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  status: PostStatus;
  author: string;
  views: number;
  readTime: number; // minutos
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'views' | 'createdAt' | 'updatedAt'>;

// ========================================
// LEADS / CLIENTES
// ========================================
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost';
export type LeadService =
  | 'maquiagem-noiva'
  | 'penteado-noiva'
  | 'dia-de-noiva'
  | 'madrinhas'
  | 'debutante'
  | 'evento'
  | 'spa-day'
  | 'outro';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: LeadService;
  eventDate: string | null;
  message: string;
  source: string; // página de origem
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadInput = Omit<Lead, 'id' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>;

// ========================================
// ANALYTICS / PAGE VIEWS
// ========================================
export type DeviceType = 'mobile' | 'desktop' | 'tablet';

export interface PageView {
  id: string;
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  device: DeviceType;
  browser: string;
  country: string;
  city: string;
  sessionId: string;
  createdAt: string;
}

export interface AnalyticsDashboard {
  totalViews: number;
  totalViewsToday: number;
  totalViewsWeek: number;
  totalViewsMonth: number;
  totalLeads: number;
  totalLeadsMonth: number;
  conversionRate: number;
  totalPosts: number;
  publishedPosts: number;
  topPages: { page: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  viewsByDay: { date: string; views: number }[];
  viewsByDevice: { device: string; count: number }[];
  viewsBySource: { source: string; count: number }[];
  leadsByService: { service: string; count: number }[];
  topCities: { city: string; count: number }[];
}
