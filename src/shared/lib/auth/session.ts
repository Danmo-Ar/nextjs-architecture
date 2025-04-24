import { cookies } from 'next/headers';
import 'server-only';

export const SESSION_NAME = 'session';

export const createSession = async (payload: User) => {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_NAME, JSON.stringify(payload), {
        httpOnly: true,
        secure: true,
        expires: payload.exp,
        sameSite: 'lax',
        path: '/'
    });
};

export const getServerSession = async () => {
    const session = (await cookies()).get(SESSION_NAME);
    if (session) {
        return JSON.parse(session.value) as User;
    }
    return null;
};

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_NAME);
}
