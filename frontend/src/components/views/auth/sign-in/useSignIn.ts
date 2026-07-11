import {useForm} from "react-hook-form";
import {ISignIn} from "@/src/interfaces/auth/ISignIn";
import {joiResolver} from "@hookform/resolvers/joi";
import {signInValidator} from "@/src/validators/auth/sign-in.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useEffect, useState} from "react";
import {useUserFromSocialNetworkStore} from "@/src/hooks/shared/useSharedStore";
import {useRouter} from "next/navigation";
import {authService} from "@/src/services/auth.service";
import {AuthProvider} from "@firebase/auth";
import {firebaseService} from "@/src/services/firebase.service";
import {IUserFromSocialNetworkWithToken} from "@/src/interfaces/users/IUserFromSocialNetwork";

const useSignIn = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<ISignIn>({mode: 'all', resolver: joiResolver(signInValidator, JoiOptions)})
    const [isShownPassword, setIsShownPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const {setApiResponse} = useUserFromSocialNetworkStore()
    const router = useRouter()

    useEffect(() => {

        return () => {
            localStorage.removeItem('signInFormData');
        };
    }, []);

    const onSubmit = async (formData: ISignIn) => {
        setIsLoading(true)
        setErrorMessage(null)
            const result = await authService.signIn(formData)
            if (result.success) {
                localStorage.removeItem('signInFormData')
                router.push('/')
                router.refresh()
            } else {
                setErrorMessage(result.data.message)
            }
        setIsLoading(false)
    }

    const handleSignInWithSocialNetwork = (provider: AuthProvider) => {
        return async () => {
            const result = await firebaseService.serviceSignIn(provider)
            if(result.success){
                switch (result.status){
                    case 200:
                        router.push('/')
                        router.refresh()
                        break
                    case 202:
                        setApiResponse(result.data as IUserFromSocialNetworkWithToken)
                        router.push('/auth/sign-up')
                }
            }
            else{
                setErrorMessage(result.data.message)
            }
        }
    }

    const onFocusInput = () => {
        if(errorMessage){
            setErrorMessage(null)
        }
    }

    return {register, handleSubmit, errors, isValid, isShownPassword, setIsShownPassword, errorMessage, onSubmit, handleSignInWithSocialNetwork, isLoading, onFocusInput}
}

export default useSignIn