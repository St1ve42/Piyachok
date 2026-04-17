import {useForm} from "react-hook-form";
import {ISignIn} from "@/src/interfaces/auth/ISignIn";
import {joiResolver} from "@hookform/resolvers/joi";
import {signInValidator} from "@/src/validators/sign-in.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useEffect, useState} from "react";
import {useUserFromSocialNetworkStore} from "@/src/zustand/useSharedStore";
import {useRouter} from "next/navigation";
import {authService} from "@/src/services/auth.service";
import {AuthProvider} from "@firebase/auth";
import {firebaseService} from "@/src/services/firebase.service";
import {IUserFromSocialNetworkWithToken} from "@/src/interfaces/users/IUserFromSocialNetwork";

const useSignIn = () => {
    const {register, watch, reset, handleSubmit, formState: {errors, isValid}} = useForm<ISignIn>({mode: 'all', resolver: joiResolver(signInValidator, JoiOptions)})
    const [isShownPassword, setIsShownPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const {setApiResponse} = useUserFromSocialNetworkStore()
    const router = useRouter()
    // eslint-disable-next-line react-hooks/incompatible-library
    const allFields = watch()

    useEffect(() => {
        const formData = localStorage.getItem('signInFormData')
        if(formData){
            try{
                const parsedData = JSON.parse(formData);
                reset(parsedData)
            }
            catch(e){
                console.log("Помилка парсингу даних: ", e)
            }
        }
    }, [reset]);

    useEffect(() => {
        if(!isLoading && !isSuccessfullySubmitted){
            const {password, ...restSignIn} = allFields
            localStorage.setItem('signInFormData', JSON.stringify(restSignIn))
        }
    }, [allFields, isLoading, isSuccessfullySubmitted]);

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
                setIsSuccessfullySubmitted(true)
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
    return {register, handleSubmit, errors, isValid, isShownPassword, setIsShownPassword, errorMessage, onSubmit, handleSignInWithSocialNetwork, isLoading}
}

export default useSignIn