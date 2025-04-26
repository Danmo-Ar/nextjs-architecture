import { decrypt, encrypt } from '@/shared/utils/crypto';
import { decode } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import 'server-only';

export const TOKEN_PAYLOAD = 'token_payload';

export const setServerTokenPayload = async (token: TokenPayload) => {
    const cookieStore = await cookies();
    const encryptedPayload = await encrypt(token);
    cookieStore.set(TOKEN_PAYLOAD, encryptedPayload, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/'
    });

    return await getServerTokenPayload();
};

export const getServerTokenPayload = async () => {
    const tokenPayload = (await cookies()).get(TOKEN_PAYLOAD);
    if (tokenPayload) {
        return (await decrypt(tokenPayload.value)) as TokenPayload;
    }
    return null;
};

export const decodeToken = <T>(token: string): T => {
    if (!token) {
        throw new Error('Token is required');
    }
    // decode the token
    const decoded = decode(token);
    return decoded as T;
};
