import {ApiError} from "@/src/errors/api.error";

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T, status: number }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
        ...options,
        credentials: options.credentials || 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(errorData, response.status)
    }

    return {data: response.status !==204 ? await response.json() : null, status: response.status};
}