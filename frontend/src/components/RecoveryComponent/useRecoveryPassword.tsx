import {useForm} from "react-hook-form";
import {IRecovery} from "@/src/interfaces/auth/IRecovery";
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
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IRecovery & {repeatedPassword: string}>({mode: 'all', resolver: joiResolver(recoveryValidator, JoiOptions)})
    const [isShownPassword, setIsShownPassword] = useState(false)
    const [isShownRepeatedPassword, setIsShownRepeatedPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()
    const onSubmit = async (data: IRecovery & {repeatedPassword: string}) => {
        const {password} = data
        try {
            const result = await authService.recovery({password}, token)
            if (result.success) {
                router.push('/')
                router.refresh()
            } else {
                setErrorMessage(result.data && 'message' in result.data ? result.data.message : 'Помилка створення нового паролю')
            }
        } catch (error) {
            setErrorMessage('Помилка підключення до сервера')
            console.error(error)
        }
    }
    return {register, handleSubmit, errors, isShownPassword, setIsShownPassword, isShownRepeatedPassword, setIsShownRepeatedPassword, errorMessage, isValid, onSubmit}
}

export default useRecoveryPassword