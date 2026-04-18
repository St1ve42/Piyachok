import {useForm} from "react-hook-form";
import {IRecoveryWithRepeatedPassword} from "@/src/interfaces/auth/IRecovery";
import {joiResolver} from "@hookform/resolvers/joi";
import {recoveryValidator} from "@/src/validators/recovery.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {authService} from "@/src/services/auth.service";

type PropsType = {
    token: string
}

const useRecoveryPassword = ({token}: PropsType) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IRecoveryWithRepeatedPassword>({mode: 'all', resolver: joiResolver(recoveryValidator, JoiOptions)})
    const [isShownPassword, setIsShownPassword] = useState(false)
    const [isShownRepeatedPassword, setIsShownRepeatedPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()
    const onSubmit = async (formData: IRecoveryWithRepeatedPassword) => {
        setIsLoading(true)
        const {password} = formData
        const result = await authService.recovery({password}, token)
        if (result.success) {
            router.push('/')
            router.refresh()
        } else {
            setErrorMessage(result.data.message)
        }
        setIsLoading(false)
    }
    return {isLoading, register, handleSubmit, errors, isShownPassword, setIsShownPassword, isShownRepeatedPassword, setIsShownRepeatedPassword, errorMessage, isValid, onSubmit}
}

export default useRecoveryPassword