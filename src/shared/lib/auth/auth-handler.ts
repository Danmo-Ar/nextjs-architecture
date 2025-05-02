import { NextRequest, NextResponse } from 'next/server';
import { authArtefact } from './auth-artefacts';

/**
 * Method handler type for processing auth requests
 */
type MethodHandler = (
    req: NextRequest,
    params: Promise<{ authRoute: AuthRoutes[] }>
) => Promise<NextResponse>;

/**
 * Configuration options for MinimalAuth
 */
type MinimalAuthOptions = {
    authEndpoint: string;
    refreshTokenEndpoint: string;
    redirect: {
        signIn: string;
        signOut: string;
    };
};

/**
 * Class for handling authentication routes and methods
 */
export class MinimalAuth {
    constructor(private options: MinimalAuthOptions) {
        // Validate required options
        this.validateOptions();
    }

    /**
     * Validates that all required options are provided
     * @private
     */
    private validateOptions(): void {
        if (!this.options.authEndpoint) {
            throw new Error('Auth endpoint is required in MinimalAuth options');
        }
        if (!this.options.refreshTokenEndpoint) {
            throw new Error(
                'Refresh token endpoint is required in MinimalAuth options'
            );
        }
        if (!this.options.redirect?.signIn || !this.options.redirect?.signOut) {
            throw new Error(
                'Redirect URLs are required in MinimalAuth options'
            );
        }
    }

    /**
     * Factory method to create an auth request handler based on HTTP methods
     */
    makeAuthHandler = (handlers: Record<string, MethodHandler>) => {
        return async (
            req: NextRequest,
            { params }: { params: Promise<{ authRoute: AuthRoutes[] }> }
        ) => {
            try {
                // Get the method request to grab the correct handler function
                const { method } = req;
                const handler = handlers[method];

                // Log incoming request (useful for debugging)
                console.info(`Auth request: ${method} ${req.url}`);

                // if the handler is not defined it's means that the method is not allowed
                // so we return a 405 error
                if (!handler) {
                    console.warn(`Method ${method} not allowed for auth route`);
                    return NextResponse.json(
                        {
                            error: `Method ${method} not allowed`,
                            status: 405
                        },
                        { status: 405 }
                    );
                }

                // Validate authentication route parameter
                const authParams = await params;
                if (
                    !authParams.authRoute ||
                    !Array.isArray(authParams.authRoute)
                ) {
                    console.error('Invalid auth route parameters');
                    return NextResponse.json(
                        {
                            error: 'Invalid auth route',
                            status: 400
                        },
                        { status: 400 }
                    );
                }

                // If everything is pass we return the correct handler function that should be run to perform the correction function
                return handler(req, params);
            } catch (error) {
                // Global error handling for all auth requests
                console.error('Auth handler error:', error);
                return NextResponse.json(
                    {
                        error: 'Authentication request failed',
                        details:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                        status: 500
                    },
                    { status: 500 }
                );
            }
        };
    };

    /**
     * Request handler for authentication routes
     * @private
     */
    private handler = this.makeAuthHandler({
        POST: async (req, params) => {
            try {
                const { authRoute } = await params;
                let body: Record<string, unknown>;

                try {
                    body = await req.json();
                } catch (parseError) {
                    console.error('Failed to parse request body:', parseError);
                    return NextResponse.json(
                        { error: 'Invalid JSON in request body', status: 400 },
                        { status: 400 }
                    );
                }

                if (!body || Object.keys(body).length === 0) {
                    return NextResponse.json(
                        {
                            error: 'Request body is empty or invalid',
                            status: 400
                        },
                        { status: 400 }
                    );
                }

                // Handle sign-in logic
                if (authRoute[0] === 'sign-in') {
                    // Validate required fields for sign-in
                    if (!body.email || !body.password) {
                        return NextResponse.json(
                            {
                                error: 'Email and password are required',
                                status: 400
                            },
                            { status: 400 }
                        );
                    }

                    return authArtefact['sign-in']({
                        body,
                        authEndpoint: this.options.authEndpoint
                    });
                }

                // Add support for additional POST routes here

                return NextResponse.json(
                    { error: 'Route not found', status: 404 },
                    { status: 404 }
                );
            } catch (error) {
                console.error('POST handler error:', error);
                return NextResponse.json(
                    {
                        error: 'Failed to process authentication request',
                        details:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                        status: 500
                    },
                    { status: 500 }
                );
            }
        },

        GET: async (req, params) => {
            try {
                const { authRoute } = await params;
                const url = new URL(req.url);
                const queryParams = Object.fromEntries(
                    url.searchParams.entries()
                );

                // Handle sign-out logic
                if (authRoute[0] === 'sign-out') {
                    return authArtefact['sign-out']({
                        redirect: this.options.redirect.signOut
                    });
                }

                // Handle token refresh logic
                if (authRoute[0] === 'refresh-token') {
                    return authArtefact['refresh-token'](
                        this.options.refreshTokenEndpoint
                    );
                }

                console.warn(`Route not found: ${authRoute.join('/')}`);
                return NextResponse.json(
                    { error: 'Route not found', status: 404 },
                    { status: 404 }
                );
            } catch (error) {
                console.error('GET handler error:', error);
                return NextResponse.json(
                    {
                        error: 'Failed to process authentication request',
                        details:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                        status: 500
                    },
                    { status: 500 }
                );
            }
        }
    });

    /**
     * Public handlers for route.ts implementation
     */
    get handlers() {
        const GET = this.handler;
        const POST = this.handler;

        return { POST, GET };
    }
}
