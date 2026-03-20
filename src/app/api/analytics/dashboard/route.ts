/**
 * API ROUTE: /api/analytics/dashboard — Retorna métricas agregadas
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDashboardMetrics } from '@/lib/db/analytics';
import { getLeadStats } from '@/lib/db/leads';
import { getPostStats } from '@/lib/db/posts';
import { getSessionFromCookie, COOKIE_NAME } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const session = await getSessionFromCookie(cookie);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30');

  const [analytics, leads, posts] = await Promise.all([
    getDashboardMetrics(days),
    getLeadStats(),
    getPostStats(),
  ]);

  return NextResponse.json({
    ...analytics,
    totalLeads: leads.total,
    totalLeadsMonth: leads.leadsThisMonth,
    conversionRate: leads.conversionRate,
    totalPosts: posts.published + posts.drafts + posts.archived,
    publishedPosts: posts.published,
    draftPosts: posts.drafts,
    leadsByService: leads.byService,
    leadsNewCount: leads.newLeads,
    leadsContactedCount: leads.contacted,
    leadsConvertedCount: leads.converted,
    topPost: posts.topPost ? { title: posts.topPost.title, views: posts.topPost.views } : null,
    totalPostViews: posts.totalViews,
  });
}
