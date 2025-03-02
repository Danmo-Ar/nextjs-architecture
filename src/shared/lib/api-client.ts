import { $env } from '@/src/config';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    cookie?: string;
    params?: Record<string, string | number | boolean | undefined | null>;
    // eslint-disable-next-line no-undef
    cache?: RequestCache;
    // eslint-disable-next-line no-undef
    next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
    url: string,
    params?: RequestOptions['params']
): string {
    if (!params) return url;
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) => value !== undefined && value !== null
        )
    );
    if (Object.keys(filteredParams).length === 0) return url;
    const queryString = new URLSearchParams(
        filteredParams as Record<string, string>
    ).toString();
    return `${url}?${queryString}`;
}

// Create a separate function for getting server-side cookies that can be imported where needed
export function getServerCookies() {
    if (typeof window !== 'undefined') return '';

    // Dynamic import next/headers only on server-side
    return import('next/headers').then(({ cookies }) => {
        try {
            const cookieStore = cookies();
            return cookieStore
                .getAll()
                .map((c) => `${c.name}=${c.value}`)
                .join('; ');
        } catch (error) {
            console.error('Failed to access cookies:', error);
            return '';
        }
    });
}

async function fetchApi<T>(
    url: string,
    options: RequestOptions = {}
): Promise<T> {
    const {
        method = 'GET',
        headers = {},
        body,
        cookie,
        params,
        cache = 'no-store',
        next
    } = options;

    // Get cookies from the request when running on server
    let cookieHeader = cookie;
    if (typeof window === 'undefined' && !cookie) {
        cookieHeader = await getServerCookies();
    }

    const fullUrl = buildUrlWithParams(`${$env.server.API_URL}${url}`, params);

    const response = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers,
            ...(cookieHeader ? { Cookie: cookieHeader } : {})
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        cache,
        next
    });

    if (!response.ok) {
        const message = (await response.json()).message || response.statusText;
        if (typeof window !== 'undefined') {
            // TODO : add toast notification and on certain error reply
        }
        throw new Error(message);
    }

    return response.json();
}

export const api = {
    get<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'GET' });
    },
    post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'POST', body });
    },
    put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'PUT', body });
    },
    patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'PATCH', body });
    },
    delete<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'DELETE' });
    }
};
