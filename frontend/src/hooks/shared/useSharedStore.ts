import {create} from "zustand";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IUserFromSocialNetworkWithToken} from "@/src/interfaces/users/IUserFromSocialNetwork";
import {createJSONStorage, persist} from "zustand/middleware";

interface IStore<T> {
    previousApiResponse: T | null,
    setApiResponse: (data: T) => void
}

interface IConfirmAge {
  isConfirmed: boolean | null,
  setIsConfirmedAge: (isConfirmed: boolean | null) => void
}

interface IEmail {
    email: string | null,
    setEmail: (email: string | null) => void
}

const createSharedStore = <T>() => create<IStore<T>>(
    (set) => ({
        previousApiResponse: null,
        setApiResponse: (apiResponse: T) => set({previousApiResponse: apiResponse})
    }),
)

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

export const useEmailStore = create<IEmail>()(
    persist(
        (set) => ({
            email: null,
            setEmail: (email: string | null) => set({email}),
            resetEmail: () => set({email: null})
        }),
        {
            name: 'email',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export const useCreateFoodAndDrinkApiStore = createSharedStore

export const useResponseMessageStore = createSharedStore<IResponseMessage>()
export const useUserFromSocialNetworkStore = createSharedStore<IUserFromSocialNetworkWithToken>()



