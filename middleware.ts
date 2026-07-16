import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';

    // Allow Facebook crawler
    if (userAgent.includes('facebookexternalhit') || userAgent.includes('Facebot')) {
        return NextResponse.next();
    }

    // Protect /admin routes, but allow /admin-login
    if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
        const session = request.cookies.get('admin_session');
        if (!session || session.value !== 'true') {
            const loginUrl = new URL('/admin-login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Skip i18n middleware for admin, api, and static routes
    // But allow /admin-login through i18n (it lives under [locale])
    if (
        (pathname.startsWith('/admin') && pathname !== '/admin-login') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname === '/favicon.ico' ||
        pathname === '/sitemap.xml' ||
        pathname === '/robots.txt' ||
        pathname === '/manifest.json' ||
        pathname === '/thumbnail.png' ||
        pathname === '/sw.js'
    ) {
        return NextResponse.next();
    }

    // Apply next-intl middleware
    const response = await intlMiddleware(request);
    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth).*)"
    ]
};
