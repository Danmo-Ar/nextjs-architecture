import { API_URL, IS_CLIENT } from '@/constants';
import { rmSlashStartUrl } from './rm-slash-api-url';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
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
export async function getServerCookies() {
    if (typeof window !== 'undefined') return '';

    // Dynamic import next/headers only on server-side
    return import('next/headers').then(async ({ cookies }) => {
        try {
            const cookieStore = cookies();
            return (await cookieStore)
                .getAll()
                .map((c) => `${c.name}=${c.value}`)
                .join('; ');
        } catch (error) {
            console.error('Failed to access cookies:', error);
            return '';
        }
    });
}

type FetchResponse<T> = Promise<{
    data: T;
    error: any;
}>;

async function fetchApi<T = any>(
    url: string,
    options: RequestOptions = {},
    isTiers: boolean = false // nous permet de savoir si l'url est une url tiers ou non
): FetchResponse<T> {
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

    const fullUrl = isTiers
        ? url
        : buildUrlWithParams(`${API_URL}/${rmSlashStartUrl(url)}`, params);

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
    const res = await response.json();

    if (!response.ok) {
        if (typeof window === 'undefined') {
            return {
                data: res,
                error: res?.data
            };
        }
        const message = res.message || res.data.message || response.statusText;
        if (IS_CLIENT && response.status === 401) {
            // TODO : add unautorized logic for refresh token maybe
            // TODO : add toast notification and on certain error reply
        }
        throw new Error(message);
    }

    return { data: res, error: null };
}

export const api = {
    get<T = any>(
        url: string,
        options?: RequestOptions,
        isTiers: boolean = false
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'GET' }, isTiers);
    },
    selfGet<T = any>(
        url: string,
        options?: RequestOptions,
        isTiers: boolean = false
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'GET' }, true);
    },
    post<T = any>(
        url: string,
        body?: unknown,
        options?: RequestOptions,
        isTiers: boolean = false
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'POST', body }, isTiers);
    },
    selfPost<T = any>(
        url: string,
        body?: unknown,
        options?: RequestOptions
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'POST', body }, true);
    },
    put<T>(
        url: string,
        body?: unknown,
        options?: RequestOptions,
        isTiers: boolean = false
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'PUT', body }, isTiers);
    },
    patch<T>(
        url: string,
        body?: unknown,
        options?: RequestOptions,
        isTiers: boolean = false
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'PATCH', body }, isTiers);
    },
    delete<T>(
        url: string,
        options?: RequestOptions,
        isTiers: boolean = false
    ): FetchResponse<T> {
        return fetchApi<T>(url, { ...options, method: 'DELETE' }, isTiers);
    }
};
