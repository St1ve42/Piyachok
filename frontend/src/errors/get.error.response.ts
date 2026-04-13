import {IApiResponse} from "@/src/interfaces/shared/IApiResponse";
import {ApiError} from "@/src/errors/api.error";

export const getErrorResponse = <T>(e: unknown): IApiResponse<T> => {
    if(e instanceof ApiError){
        const {status, data} = e
        return {
            success: false,
            status,
            data
        }
    }
    return {success: false, status: 500, data: {
        timestamp: new Date().toISOString(),
        path: "",
        error: "NETWORK_ERROR",
        message: 'Проблеми зі з’єднанням. Спробуйте пізніше.',
    }
    }
}