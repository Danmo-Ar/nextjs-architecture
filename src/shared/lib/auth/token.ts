import { decode } from 'jsonwebtoken';
import 'server-only';

export const decodeToken = <T>(token: string): T => {
    if (!token) {
        throw new Error('Token is required');
    }

    // decode the token
    const decoded = decode(token);

    return decoded as T;
};
