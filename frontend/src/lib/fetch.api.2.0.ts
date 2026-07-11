import {IError} from "@/src/interfaces/shared/IError";
import {QueryDirector} from "@/src/lib/query.director";
import {IGeneralQuery} from "@/src/interfaces/shared/IGeneralQuery";

export async function fetchApi20<T = null>(
    endpoint: string,
    options: RequestInit = {},
    additionalParams?: {
        query?: IGeneralQuery,
        accessCookie?: string
    }
): Promise<{ data: T; status: number, success: true } | { data: IError; status: number, success: false }> {
    if(additionalParams){
        const {query, accessCookie} = additionalParams
        if(query){
            const queryDirector = new QueryDirector(endpoint, query);
            endpoint = queryDirector.build()
        }
        if(accessCookie){
            options['headers'] = {'Cookie': accessCookie}
        }
    }
    const body = options.body
    const isFormData = typeof FormData !== undefined && body instanceof FormData
    const defaultHeaders: Record<string, string> = isFormData ? {} : { 'Content-type': 'application/json' };
    const url = (typeof window === 'undefined' ? process.env.NEXT_PUBLIC_INTERNAL_API_URL : process.env.NEXT_PUBLIC_BASE_API_URL) + endpoint
    try{
        const response = await fetch(url, {
            ...options,
            credentials: options.credentials || 'include',
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        })
        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => ({}));
            return {
                data: errorData,
                status: response.status,
                success: false,
            };
        }

        return {
            data:
                response.status !== 204 ? await response.json() : null,
            status: response.status,
            success: true
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Проблеми з мережею'
        return {
            data: { message, timestamp: new Date().toISOString(), path: "", error: "NETWORK_ERROR", },
            status: 0,
            success: false
        }
    }
}
