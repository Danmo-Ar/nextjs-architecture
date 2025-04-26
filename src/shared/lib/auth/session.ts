import { decrypt, encrypt } from '@/shared/utils/crypto';
import { cookies } from 'next/headers';
import 'server-only';
import { TOKEN_PAYLOAD } from './token';

export const SESSION_NAME = 'session';

export const createSession = async (payload: User): Promise<User | null> => {
    try {
        const encryptedPayload = await encrypt(payload);
        const cookieStore = await cookies();
        cookieStore.set(SESSION_NAME, encryptedPayload, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/'
        });

        return await getServerSession();
    } catch (error) {
        console.error('Error creating session:', error);
        return null;
    }
};

export const updateSession = () => {};

export const getServerSession = async () => {
    const session = (await cookies()).get(SESSION_NAME);
    if (session) {
        try {
            const decryptedSession = await decrypt(session.value);

            return decryptedSession as User;
        } catch (error) {
            console.error('Error decrypting session:', error);
            return null;
        }
    }
    return null;
};

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_NAME);
    cookieStore.delete(TOKEN_PAYLOAD);
}
