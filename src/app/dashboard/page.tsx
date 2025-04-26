'use client';

import { api } from '@/shared/lib/api-client';

const page = () => {
    return (
        <div className="h-screen bg-primary-200">
            <button
                onClick={async () => {
                    const res = await api.selfGet('api/auth/sign-out');
                    window.location.href = res?.data?.redirect;
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
