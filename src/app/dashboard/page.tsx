'use client';

import { api } from '@/shared/lib/api-client';
import { authClient } from '@/shared/lib/auth/auth-client';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    return (
        <div className="h-screen bg-primary-200">
            <button
                onClick={async () => {
                    authClient.logout(router);
                }}
            >
                Sign out
            </button>
            <button
                onClick={async () => {
                    await api.selfGet('api/auth/refresh-token');
                }}
            >
                Refresh Token
            </button>
        </div>
    );
};

export default page;
