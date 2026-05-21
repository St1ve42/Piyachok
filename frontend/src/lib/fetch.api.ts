import { ApiError } from '@/src/errors/api.error';

export async function customFetch (endpoint: string, options: RequestInit = {}): Promise<Response>{
    const body = options.body
    const isFormData = typeof FormData !== undefined && body instanceof FormData
    const defaultHeaders: Record<string, string> = isFormData ? {} : { 'Content-type': 'application/json' };
    return await fetch(`${typeof window === 'undefined' ? process.env.NEXT_PUBLIC_INTERNAL_API_URL : process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
        ...options,
        credentials: options.credentials || 'include',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    })
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ data: T; status: number }> {
    const response = await customFetch(endpoint, options)
    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => ({}));
        throw new ApiError(errorData, response.status);
    }

    return {
        data:
            response.status !== 204 ? await response.json() : null,
        status: response.status,
    };
}
