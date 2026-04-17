import {IError} from "@/src/interfaces/shared/IError";

interface FailedApiResponse {
    success: false,
    status: number,
    data: IError
}

interface SuccessfulApiResponse<T> {
    success: true,
    status: number,
    data: T
}


export type IApiResponse<T> = FailedApiResponse | SuccessfulApiResponse<T>