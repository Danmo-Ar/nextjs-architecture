import { NextRequest, NextResponse } from 'next/server';
import { APP_ROUTES } from './config/app-route.config';
import { getServerTokenPayload } from './shared/lib/auth/token';

const protectedRoutes = [APP_ROUTES.dashboard.root];

let protectedPathname = '';

export async function middleware(request: NextRequest) {
    // Get the pathname from the request URL
    const { pathname } = request.nextUrl;

    // get Server Token Payload
    const tokenPayload = await getServerTokenPayload();

    // Verify if the route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // If the route is protected and the user is not authenticated, redirect to login
    if (!tokenPayload && isProtectedRoute) {
        return NextResponse.redirect(new URL(APP_ROUTES.login, request.url));
    }

    if (isProtectedRoute) {
        // Store the protected pathname in a variable to use it when the user is authenticated and want to go on login page
        protectedPathname = pathname;
    }

    // if the route is not protected and the user is authenticated, redirect to callback url

    if (tokenPayload && pathname.startsWith(APP_ROUTES.login)) {
        return NextResponse.redirect(new URL(protectedPathname, request.url));
    }
}

export const config = {
    matcher: [
        /*
            * Match all request paths except for the ones starting with:
            * - _next/static
            * - _next/image
            * - favicon.ico
            * - api
            * - public
            * - sitemap.xml
            * - robots.txt
            
        */
        '/((?!_next/static|_next/image|favicon.ico|api|public|sitemap.xml|robots.txt).*)'
    ]
};
