import { NextRequest, NextResponse } from 'next/server';
import { getServerTokenPayload } from './shared/lib/auth/token';

export async function middleware(request: NextRequest) {
    const tokenPayload = await getServerTokenPayload();
    console.log('🚀 ~ middleware ~ tokenPayload:', tokenPayload);

    if (!tokenPayload) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*']
};
