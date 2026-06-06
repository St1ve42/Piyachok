import {IError} from "@/src/interfaces/shared/IError";

export interface FailedApiResponse {
    success: false,
    status: number,
    data: IError
}

interface SuccessfulApiResponse<T> {
    success: true,
    status: number,
    data: T
}


export type IApiResponse<T = null> = FailedApiResponse | SuccessfulApiResponse<T>