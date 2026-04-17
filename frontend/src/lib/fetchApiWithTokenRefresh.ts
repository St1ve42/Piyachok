import { ApiError } from '@/src/errors/api.error';
import {removeTokens} from "@/src/actions/auth.actions";

async function customFetch (endpoint: string, options: RequestInit = {}): Promise<Response>{
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`, {
        ...options,
        credentials: options.credentials || 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
}

async function throwApiError(response: Response): Promise<void>{
    const errorData = await response
        .json()
        .catch(() => ({}));
    throw new ApiError(errorData, response.status);
}

async function successResponse<T>(response: Response): Promise<{ data: T; status: number }> {
    return {
        data:
            response.status !== 204 ? await response.json() : null,
        status: response.status,
    };
}

/**
 * Enhanced fetch with automatic token refresh
 * Handles 401 responses by attempting token refresh
 */
export async function fetchApiWithTokenRefresh<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ data: T; status: number }> {
    const response = await customFetch(endpoint, options)

    // If unauthorized, try to refresh tokens
    if (response.status === 401) {
            const refreshResponse = await customFetch('/auth/refresh', {method: 'POST', credentials: "include"})
            if(!refreshResponse.ok){
                // Refresh failed, redirect to login
                await removeTokens()
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth/sign-in';
                }
            }
                // Retry original request after refresh
            return customFetch(endpoint, options).then(async (retryResponse) => {
                if (!retryResponse.ok) {
                    await throwApiError(retryResponse)
                }
                return await successResponse(retryResponse)
            });
    }

    if (!response.ok) {
        await throwApiError(response)
    }

    return await successResponse(response)
}
