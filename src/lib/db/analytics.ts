/**
 * CAMADA DE DADOS - Analytics / Page Views (Supabase)
 */

import { supabase } from '../supabase/client';
import { PageView, AnalyticsDashboard, DeviceType } from './types';

// ========================================
// Analytics Functions
// ========================================

export async function trackPageView(data: Omit<PageView, 'id' | 'createdAt'>): Promise<void> {
  const row = {
    page: data.page,
    referrer: data.referrer,
    utm_source: data.utmSource,
    utm_medium: data.utmMedium,
    utm_campaign: data.utmCampaign,
    device: data.device,
    browser: data.browser,
    country: data.country,
    city: data.city,
    session_id: data.sessionId,
  };

  const { error } = await supabase.from('page_views').insert([row]);
  if (error) {
    console.error('Error tracking page view:', error);
  }
}

export async function getDashboardMetrics(days = 30): Promise<AnalyticsDashboard> {
  const now = new Date();
  const dayStart = new Date(now); dayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - 7);
  const monthStart = new Date(now); monthStart.setDate(now.getDate() - days);

  // Busca os page_views dos últimos 30 dias na nuvem
  const { data: recentViews, error } = await supabase
    .from('page_views')
    .select('*')
    .gte('created_at', monthStart.toISOString());

  const pageViews = recentViews || [];

  const today = pageViews.filter((v: any) => new Date(v.created_at) >= dayStart);
  const week = pageViews.filter((v: any) => new Date(v.created_at) >= weekStart);

  // Views por dia (últimos N dias)
  const viewsByDay: { date: string; views: number }[] = [];
  for (let d = days - 1; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];
    const count = pageViews.filter((v: any) => String(v.created_at).startsWith(dateStr)).length;
    viewsByDay.push({ date: dateStr, views: count });
  }

  // Top páginas
  const pageCount: Record<string, number> = {};
  pageViews.forEach((v: any) => { pageCount[v.page] = (pageCount[v.page] || 0) + 1; });
  const topPages = Object.entries(pageCount)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Top referrers
  const refCount: Record<string, number> = {};
  pageViews.forEach((v: any) => {
    const ref = v.referrer || 'direto';
    refCount[ref] = (refCount[ref] || 0) + 1;
  });
  const topReferrers = Object.entries(refCount)
    .map(([referrer, views]) => ({ referrer, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Por device
  const devCount: Record<string, number> = {};
  pageViews.forEach((v: any) => { devCount[v.device] = (devCount[v.device] || 0) + 1; });
  const viewsByDevice = Object.entries(devCount)
    .map(([device, count]) => ({ device, count }));

  // Por source
  const srcCount: Record<string, number> = {};
  pageViews.forEach((v: any) => {
    const src = v.utm_source || 'direto';
    srcCount[src] = (srcCount[src] || 0) + 1;
  });
  const viewsBySource = Object.entries(srcCount)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  // Por cidade
  const cityCount: Record<string, number> = {};
  pageViews.forEach((v: any) => { if (v.city) cityCount[v.city] = (cityCount[v.city] || 0) + 1; });
  const topCities = Object.entries(cityCount)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    totalViews: pageViews.length,
    totalViewsToday: today.length,
    totalViewsWeek: week.length,
    totalViewsMonth: pageViews.length,
    totalLeads: 0, // Esses valores estão combinados na interface que chama ambas funções (leads e analytics na /api/dashboard)
    totalLeadsMonth: 0, 
    conversionRate: 0,
    totalPosts: 0,
    publishedPosts: 0,
    topPages,
    topReferrers,
    viewsByDay,
    viewsByDevice,
    viewsBySource,
    leadsByService: [],
    topCities,
  };
}

export async function getPageViewCount(page: string): Promise<number> {
  const { count } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .eq('page', page);
  return count || 0;
}
