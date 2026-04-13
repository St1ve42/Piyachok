import {IError} from "@/src/interfaces/shared/IError";

export interface IApiResponse<T>{
    data: T | IError,
    success: boolean,
    status: number
}