import { MinimalAuth } from '@/shared/lib/auth/auth-handler';

export const { GET, POST } = new MinimalAuth({
    authEndpoint: '/authentication/sign-in',
    refreshTokenEndpoint: '/authentication/refresh-token',
    redirect: {
        signIn: '/dashboard',
        signOut: '/login'
    }
}).handlers;
