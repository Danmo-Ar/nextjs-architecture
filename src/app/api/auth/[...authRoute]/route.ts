import { $env } from '@/config/env';
import { api } from '@/shared/lib/api-client';
import { createSession, getServerSession } from '@/shared/lib/auth/session';
import { decodeToken } from '@/shared/lib/auth/token';
import { ResponseSend } from '@/shared/utils/response-wrapper';

export const POST = async (
    request: Request,
    { params }: { params: Promise<{ authRoute: AuthRoutes }> }
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

        const { accessToken: token, refreshToken } = res?.data?.data;

        const userInfo = decodeToken<User>(token);

        if (userInfo) {
            createSession({ ...userInfo, token, refreshToken });
        }
        const session = await getServerSession();
        console.log('🚀 ~ session:', session);

        return ResponseSend({ data: { error: null } });
    }
    const data = { authRoute, env: $env.client.NEXT_PUBLIC_API_URL };
    return ResponseSend({ data });
};
