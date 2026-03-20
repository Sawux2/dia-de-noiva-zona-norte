/**
 * MIDDLEWARE - Proteção de rotas e tracking de pageviews
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ═══════════════════════════════════════
  // PROTEÇÃO DO PAINEL ADMIN
  // ═══════════════════════════════════════
  if (pathname.startsWith('/admin')) {
    // Login não precisa de autenticação
    if (pathname === '/admin/login') {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        const session = await verifyToken(token);
        if (session) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
      return NextResponse.next();
    }

    // Todas as outras rotas admin precisam de autenticação
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const session = await verifyToken(token);
    if (!session) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    return NextResponse.next();
  }

  // ═══════════════════════════════════════
  // TRACKING DE PAGEVIEWS (rotas públicas)
  // ═══════════════════════════════════════
  if (
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/favicon')
  ) {
    // Dispara tracking de forma assíncrona (não bloqueia a resposta)
    const trackUrl = new URL('/api/analytics/track', request.url);
    
    const device = getDeviceType(request.headers.get('user-agent') || '');
    const utmSource = request.nextUrl.searchParams.get('utm_source') || '';
    const utmMedium = request.nextUrl.searchParams.get('utm_medium') || '';
    const utmCampaign = request.nextUrl.searchParams.get('utm_campaign') || '';
    
    // Tracking não-bloqueante
    fetch(trackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        referrer: request.headers.get('referer') || '',
        utmSource,
        utmMedium,
        utmCampaign,
        device,
        browser: getBrowser(request.headers.get('user-agent') || ''),
        country: request.geo?.country || 'BR',
        city: request.geo?.city || 'São Paulo',
        sessionId: request.cookies.get('session_id')?.value || '',
      }),
    }).catch(() => {}); // Ignora erros de tracking
  }

  return NextResponse.next();
}

function getDeviceType(ua: string): 'mobile' | 'desktop' | 'tablet' {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|windows phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getBrowser(ua: string): string {
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  return 'Other';
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
