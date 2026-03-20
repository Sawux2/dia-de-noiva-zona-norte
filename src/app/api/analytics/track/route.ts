/**
 * API ROUTE: /api/analytics/track — Registra pageview
 */

import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@/lib/db/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await trackPageView({
      page: body.page || '/',
      referrer: body.referrer || '',
      utmSource: body.utmSource || '',
      utmMedium: body.utmMedium || '',
      utmCampaign: body.utmCampaign || '',
      device: body.device || 'desktop',
      browser: body.browser || 'Chrome',
      country: body.country || 'BR',
      city: body.city || '',
      sessionId: body.sessionId || '',
    });
    return NextResponse.json({ tracked: true });
  } catch {
    return NextResponse.json({ tracked: false }, { status: 500 });
  }
}
