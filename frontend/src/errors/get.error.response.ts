import {ApiError} from "@/src/errors/api.error";
import {IError} from "@/src/interfaces/shared/IError";

export const getErrorResponse = (e: unknown): {success: false, status: number, data: IError} => {
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

