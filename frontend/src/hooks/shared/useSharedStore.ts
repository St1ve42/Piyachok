import {create} from "zustand";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IUserFromSocialNetworkWithToken} from "@/src/interfaces/users/IUserFromSocialNetwork";
import {createJSONStorage, persist} from "zustand/middleware";

interface IStore<T> {
    previousApiResponse: T | null,
    setApiResponse: (data: T) => void
}

interface IError {
    error: string | null,
    setError: (error: string | null) => void
}

interface IConfirmAge {
  isConfirmed: boolean | null,
  setIsConfirmedAge: (isConfirmed: boolean | null) => void
}

const createSharedStore = <T>() => create<IStore<T>>(
    (set) => ({
        previousApiResponse: null,
        setApiResponse: (apiResponse: T) => set({previousApiResponse: apiResponse})
    }),
)

export const useErrorStore = create<IError>(
    (set) => ({
        error: null,
        setError: (error: string | null) => set({error})
}))

export const useConfirmAgeStore = create<IConfirmAge>()(
    persist(
      (set) => ({
        isConfirmed: null,
        setIsConfirmedAge: (isConfirmed: boolean | null) => set({isConfirmed})
      }),
        {
            name: 'isConfirmedAge',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export const useResponseMessageStore = createSharedStore<IResponseMessage>()
export const useUserFromSocialNetworkStore = createSharedStore<IUserFromSocialNetworkWithToken>()



