import { NextResponse } from 'next/server';
import { api } from '../api-client';
import { createSession, deleteSession } from './session';
import {
    decodeToken,
    getServerTokenPayload,
    setServerTokenPayload
} from './token';

/**
 * Authentication artifacts for handling sign-in, sign-out, and token refresh operations
 */
export const authArtefact = {
    /**
     * Handles user sign-in process
     * @param body - User credentials
     * @param authEndpoint - Authentication API endpoint
     * @returns NextResponse with redirect or error information
     */
    ['sign-in']: async ({
        body,
        authEndpoint
    }: {
        body: Record<string, unknown>;
        authEndpoint: string;
    }) => {
        try {
            // Validate required fields
            if (!body.email || !body.password) {
                return NextResponse.json({
                    error: 'Email and password are required',
                    status: 400
                });
            }

            const res = await api.post<LoginResponse>(authEndpoint, body);

            if (res?.error) {
                console.error('Sign-in error:', res.error);
                return NextResponse.json({
                    error: res.error || 'Invalid credentials',
                    status: 401
                });
            }

            if (
                !res?.data?.data?.accessToken ||
                !res?.data?.data?.refreshToken
            ) {
                console.error('Invalid token data received');
                return NextResponse.json({
                    error: 'Invalid authentication response',
                    status: 500
                });
            }

            const { accessToken, refreshToken } = res.data.data;

            const userInfo = decodeToken<User>(accessToken);

            if (!userInfo) {
                console.error('Failed to decode user token');
                return NextResponse.json({
                    error: 'Invalid token format',
                    status: 401
                });
            }

            try {
                const user = await createSession({ ...userInfo });
                const tokenPayload = await setServerTokenPayload({
                    accessToken,
                    refreshToken
                });

                if (user && tokenPayload) {
                    // Include a timestamp for session creation
                    return NextResponse.json({
                        redirect: '/dashboard',
                        authenticated: true,
                        timestamp: new Date().toISOString()
                    });
                }
            } catch (sessionError) {
                console.error('Session creation error:', sessionError);
                return NextResponse.json({
                    error: 'Failed to create session',
                    status: 500
                });
            }

            return NextResponse.json({
                error: 'Authentication failed',
                status: 500
            });
        } catch (error) {
            console.error('Unexpected sign-in error:', error);
            return NextResponse.json({
                error: 'An unexpected error occurred during sign-in',
                status: 500
            });
        }
    },

    /**
     * Handles user sign-out process
     * @param redirect - URL to redirect after sign-out
     * @returns NextResponse with redirect information
     */
    ['sign-out']: async ({ redirect }: { redirect: string }) => {
        try {
            await deleteSession();
            return NextResponse.json({
                redirect,
                success: true,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Sign-out error:', error);
            return NextResponse.json({
                error: 'Failed to sign out',
                status: 500
            });
        }
    },

    /**
     * Handles token refresh process
     * @param refreshTokenEndpoint - Endpoint for refreshing tokens
     * @returns NextResponse with updated token data or error
     */
    ['refresh-token']: async (refreshTokenEndpoint: string) => {
        try {
            const tokenPayload = await getServerTokenPayload();

            if (!tokenPayload?.refreshToken) {
                console.error('No refresh token available');
                return NextResponse.json({
                    error: 'No refresh token available',
                    status: 401
                });
            }

            // Implement retry logic with exponential backoff
            const MAX_RETRIES = 3;
            let retries = 0;
            let delay = 1000; // Start with 1 second delay

            while (retries < MAX_RETRIES) {
                try {
                    const res = await api.post<LoginResponse>(
                        refreshTokenEndpoint,
                        {
                            refreshToken: tokenPayload.refreshToken
                        }
                    );

                    if (res?.error) {
                        throw new Error(res.error);
                    }

                    const { accessToken, refreshToken } = res?.data?.data;

                    if (!accessToken || !refreshToken) {
                        throw new Error('Invalid token data received');
                    }

                    const userInfo = decodeToken<User>(accessToken);

                    if (!userInfo) {
                        throw new Error('Failed to decode user token');
                    }

                    await createSession({ ...userInfo });
                    await setServerTokenPayload({ accessToken, refreshToken });

                    return NextResponse.json({
                        data: res.data,
                        refreshed: true,
                        timestamp: new Date().toISOString()
                    });
                } catch (error) {
                    retries++;

                    if (retries >= MAX_RETRIES) {
                        throw error;
                    }

                    // Exponential backoff
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    delay *= 2; // Double the delay for next retry
                }
            }

            // This code should not be reached due to the throw in the loop
            return NextResponse.json({
                error: 'Failed to refresh token after multiple attempts',
                status: 401
            });
        } catch (error) {
            console.error('Token refresh error:', error);
            return NextResponse.json({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to refresh token',
                status: 401
            });
        }
    }
};
