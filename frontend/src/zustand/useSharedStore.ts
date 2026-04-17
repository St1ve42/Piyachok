import {create} from "zustand";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IUserFromSocialNetworkWithToken} from "@/src/interfaces/IUserFromSocialNetwork";

interface IStore<T> {
    previousApiResponse: T | null,
    setApiResponse: (data: T) => void
}

const createSharedStore = <T>() => create<IStore<T>>(
    (set) => ({
        previousApiResponse: null,
        setApiResponse: (apiResponse: T) => set({previousApiResponse: apiResponse})
    }),
)

export const useResponseMessageStore = createSharedStore<IResponseMessage>()
export const useUserFromSocialNetworkStore = createSharedStore<IUserFromSocialNetworkWithToken>()



