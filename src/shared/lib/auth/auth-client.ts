/**
 * Auth Client - Client-side authentication abstraction layer
 * Provides a unified interface for all auth operations from the client side
 */

import { $toastify } from '@/shared/utils/toastify';
import { api } from '../api-client';
// No direct import of router here - will be used in React components

// Types for auth client operations
export interface AuthClientOptions {
    basePath?: string;
    onAuthSuccess?: (data: any) => void;
    onAuthError?: (error: Error) => void;
    redirects?: {
        afterLogin?: string;
        afterLogout?: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AuthClientHooks {
    useAuth: () => {
        isAuthenticated: boolean;
        user: User | null;
        loading: boolean;
        error: Error | null;
    };
}

/**
 * AuthClient - Provides a unified interface for all client-side auth operations
 */
export class AuthClient {
    private basePath: string;
    private onAuthSuccess: (data: any) => void;
    private onAuthError: (error: Error) => void;
    private afterLoginRedirect: string;
    private afterLogoutRedirect: string;

    /**
     * Create a new AuthClient instance
     * @param options Configuration options for the auth client
     */
    constructor(options: AuthClientOptions = {}) {
        this.basePath = options.basePath || '/api/auth';
        this.afterLoginRedirect = options.redirects?.afterLogin || '/dashboard';
        this.afterLogoutRedirect = options.redirects?.afterLogout || '/login';

        // Default callbacks
        this.onAuthSuccess =
            options.onAuthSuccess ||
            ((data) => {
                $toastify('success', data.message);

                return data;
            });

        this.onAuthError =
            options.onAuthError ||
            ((error) => {
                $toastify('error', error.message || 'Authentication failed');
                throw error;
            });
    }

    /**
     * Sets custom success handler
     * @param handler Success handler function
     */
    setSuccessHandler(handler: (data: any) => void): void {
        this.onAuthSuccess = handler;
    }

    /**
     * Sets custom error handler
     * @param handler Error handler function
     */
    setErrorHandler(handler: (error: Error) => void): void {
        this.onAuthError = handler;
    }

    /**
     * Handle login operation
     * @param credentials User login credentials
     * @param router Optional Next.js router instance
     * @returns Response with user data and tokens
     */
    async login(credentials: LoginCredentials, router: any): Promise<any> {
        try {
            // Input validation
            if (!credentials.email || !credentials.password) {
                throw new Error('Email and password are required');
            }

            const response = await api.selfPost(
                `${this.basePath}/sign-in`,
                credentials
            );

            if (response?.error) {
                throw new Error(response.error || 'Login failed');
            }

            // Handle navigation if router is provided
            this.navigate(router, this.getLoginRedirectUrl());
            return this.onAuthSuccess({
                ...response,
                message: 'Logged in successfully'
            });
        } catch (error) {
            return this.onAuthError(
                error instanceof Error ? error : new Error('Login failed')
            );
        }
    }

    async getSession(): Promise<any> {}

    /**
     * Handle logout operation
     * @param router Optional Next.js router instance
     * @returns Response confirming logout
     */
    async logout(router: any): Promise<any> {
        try {
            const response = await api.selfGet(`${this.basePath}/sign-out`);

            if (response?.error) {
                throw new Error(response.error || 'Logout failed');
            }

            // Handle navigation if router is provided
            this.navigate(router, this.getLogoutRedirectUrl());
            return;
            // return this.onAuthSuccess({
            //     ...response,
            //     message: 'Logged out successfully'
            // });
        } catch (error) {
            return this.onAuthError(
                error instanceof Error ? error : new Error('Logout failed')
            );
        }
    }

    /**
     * Request a password reset email
     * @param email User's email address
     * @returns Response confirming email sent
     */
    async requestPasswordReset(email: string): Promise<any> {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const response = await api.selfPost(
                `${this.basePath}/request-reset`,
                { email }
            );

            if (response?.error) {
                throw new Error(
                    response.error || 'Password reset request failed'
                );
            }

            return this.onAuthSuccess({
                ...response,
                message: 'Password reset email sent'
            });
        } catch (error) {
            return this.onAuthError(
                error instanceof Error
                    ? error
                    : new Error('Password reset request failed')
            );
        }
    }

    /**
     * Reset password with token and new password
     * @param token Reset token from email
     * @param password New password
     * @param confirmPassword Confirm new password
     * @returns Response confirming password reset
     */
    async resetPassword(
        token: string,
        password: string,
        confirmPassword: string
    ): Promise<any> {
        try {
            if (!token || !password || !confirmPassword) {
                throw new Error(
                    'Token, password, and confirmation are required'
                );
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await api.selfPost(
                `${this.basePath}/reset-password`,
                {
                    token,
                    password,
                    confirmPassword
                }
            );

            if (response?.error) {
                throw new Error(response.error || 'Password reset failed');
            }

            return this.onAuthSuccess({
                ...response,
                message: 'Password reset successful'
            });
        } catch (error) {
            return this.onAuthError(
                error instanceof Error
                    ? error
                    : new Error('Password reset failed')
            );
        }
    }

    /**
     * Verify OTP code
     * @param email User's email address
     * @param otpCode OTP code to verify
     * @returns Response confirming OTP verification
     */
    async verifyOTP(email: string, otpCode: string): Promise<any> {
        try {
            if (!email || !otpCode) {
                throw new Error('Email and OTP code are required');
            }

            const response = await api.selfPost(`${this.basePath}/verify-otp`, {
                email,
                otpCode
            });

            if (response?.error) {
                throw new Error(response.error || 'OTP verification failed');
            }

            return this.onAuthSuccess({
                ...response,
                message: 'OTP verified successfully'
            });
        } catch (error) {
            return this.onAuthError(
                error instanceof Error
                    ? error
                    : new Error('OTP verification failed')
            );
        }
    }

    /**
     * Refresh the authentication tokens
     * @returns Response with new tokens
     */
    async refreshTokens(): Promise<any> {
        try {
            const response = await api.selfGet(
                `${this.basePath}/refresh-token`
            );

            if (response?.error) {
                throw new Error(response.error || 'Token refresh failed');
            }

            return response;
        } catch (error) {
            console.error('Token refresh error:', error);
            return {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Token refresh failed'
            };
        }
    }

    /**
     * Get URL for redirection after login
     * @param customRedirect Optional custom redirect path
     * @returns Redirect URL
     */
    getLoginRedirectUrl(customRedirect?: string): string {
        return customRedirect || this.afterLoginRedirect;
    }

    /**
     * Get URL for redirection after logout
     * @param customRedirect Optional custom redirect path
     * @returns Redirect URL
     */
    getLogoutRedirectUrl(customRedirect?: string): string {
        return customRedirect || this.afterLogoutRedirect;
    }

    /**
     * Navigates to a URL using the Next.js router
     * @param router Next.js router instance
     * @param url URL to navigate to
     * @param options Optional router options
     */
    navigate(router: any, url: string, options?: { replace?: boolean }): void {
        if (!router) {
            console.warn('Router not provided for navigation');
            throw new Error('Router instance is required for navigation');
            return;
        }

        if (options?.replace) {
            router.replace(url);
        } else {
            router.push(url);
        }
    }
}

/**
 * Create a pre-configured auth client instance for the application
 * @param options Optional configuration options
 * @returns Configured AuthClient instance
 */
export const createAuthClient = (options?: AuthClientOptions): AuthClient => {
    return new AuthClient({
        ...options
    });
};

// Export a default instance for convenience
export const authClient = createAuthClient();

// Export a hook factory for React components
export const createAuthHooks = (
    client: AuthClient = authClient
): AuthClientHooks => {
    // Implementation of React hooks would go here
    // This is a placeholder that would typically integrate with a state management solution
    return {
        useAuth: () => ({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null
        })
    };
};

/**
 * Example usage with Next.js router:
 *
 * // In a component:
 * import { useRouter } from 'next/navigation';
 * import { authClient } from '@/shared/lib/auth/auth-client';
 *
 * const router = useRouter();
 *
 * // Simple login with manual navigation
 * const handleLogin = async (data) => {
 *   const response = await authClient.login(data);
 *   if (response?.redirect) {
 *     router.push(response.redirect);
 *   }
 * };
 *
 * // Or using the convenience method:
 * const handleLoginAndNavigate = async (data) => {
 *   await authClient.loginAndNavigate(data, router);
 * };
 */
