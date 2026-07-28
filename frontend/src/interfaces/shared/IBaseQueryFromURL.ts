import {IBaseQuery} from "@/src/interfaces/shared/IBaseQuery";

export type IBaseQueryFromURL = {
    [K in keyof IBaseQuery]?: string
}