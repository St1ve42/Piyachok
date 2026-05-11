import {ApiError} from "@/src/errors/api.error";
import {FailedApiResponse} from "@/src/interfaces/shared/IApiResponse";

export const getErrorResponse = (e: unknown): FailedApiResponse => {
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

