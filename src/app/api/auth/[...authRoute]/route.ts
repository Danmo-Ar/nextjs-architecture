import { $env } from '@/config/env';
import { api } from '@/shared/lib/api-client';
import { createSession, deleteSession } from '@/shared/lib/auth/session';
import {
    decodeToken,
    getServerTokenPayload,
    setServerTokenPayload
} from '@/shared/lib/auth/token';
import { ResponseSend } from '@/shared/utils/response-wrapper';

export const POST = async (
    request: Request,
    { params }: { params: Promise<{ authRoute: AuthRoutes[] }> }
) => {
    const { authRoute } = await params;

    if (authRoute[0] === 'sign-in') {
        const body = await request.json();

        const res = await api.post<LoginResponse>('/authentication/sign-in', {
            ...body
        });

        if (res?.error) {
            return ResponseSend({ data: { error: res.error }, status: 401 });
        }

        const { accessToken, refreshToken } = res?.data?.data;

        const userInfo = decodeToken<User>(accessToken);

        if (userInfo) {
            const user = await createSession({ ...userInfo });
            const tokenPayload = await setServerTokenPayload({
                accessToken,
                refreshToken
            });
            if (user && tokenPayload) {
                return ResponseSend({
                    data: { redirect: '/dashboard' }
                });
            }
        }
    }

    const data = { authRoute, env: $env.client.NEXT_PUBLIC_API_URL };
    return ResponseSend({ data });
};

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ authRoute: AuthRoutes[] }> }
) => {
    const { authRoute } = await params;

    if (authRoute[0] === 'sign-out') {
        await deleteSession();
        return ResponseSend({ data: { redirect: '/login' } });
    }

    if (authRoute[0] === 'refresh-token') {
        const tokenPayload = await getServerTokenPayload();
        console.log('🚀 ~ tokenPayload:', tokenPayload);

        const res = await api.post<LoginResponse>(
            '/authentication/refresh-token',
            {
                refreshToken: tokenPayload?.refreshToken
            }
        );

        if (res?.error) {
            return ResponseSend({ data: { error: res.error }, status: 401 });
        }
        const { accessToken, refreshToken } = res?.data?.data;
        await setServerTokenPayload({ accessToken, refreshToken });

        return ResponseSend({ data: res.data });

        // const { accessToken, refreshToken } = res?.data?.data;
    }
};
