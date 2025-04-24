type AuthRoutes =
    | 'sign-in'
    | 'verify-email'
    | 'reset-password'
    | 'refresh-token'
    | 'change-password'
    | 'update-profile';

type LoginResponse = {
    data: {
        accessToken: string;
        refreshToken: string;
    };
};

type User = {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    token: string;
    refreshToken: string;
};
