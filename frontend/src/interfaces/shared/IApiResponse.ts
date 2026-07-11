import {IError} from "@/src/interfaces/shared/IError";

export interface IFailedApiResponse {
    success: false,
    status: number,
    data: IError
}

export interface ISuccessfulApiResponse<T> {
    success: true,
    status: number,
    data: T
}


export type IApiResponse<T = null> = IFailedApiResponse | ISuccessfulApiResponse<T>