type AuthRoutes =
    | 'sign-in'
    | 'sign-out'
    // | 'verify-email'
    // | 'reset-password'
    | 'refresh-token';

type LoginResponse = {
    data: {
        accessToken: string;
        refreshToken: string;
    };
};

// type RefreshTokenResponse {
//     refresh
// }

type User = {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    accessToken: string;
    refreshToken: string;
};

type TokenPayload = {
    accessToken: string;
    refreshToken: string;
};
