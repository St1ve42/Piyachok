import {useForm} from "react-hook-form";
import {IRecoveryRequest} from "@/src/interfaces/auth/IRecoveryRequest";
import {joiResolver} from "@hookform/resolvers/joi";
import {forgotPasswordValidator} from "@/src/validators/forgot-password.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useActionState, useEffect} from "react";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IError} from "@/src/interfaces/shared/IError";
import {recoveryRequest} from "@/src/actions/auth.actions";

const useForgotPassword = () => {
    const {register, watch, reset, formState: {errors, isValid}} = useForm<IRecoveryRequest>({mode: 'all', resolver: joiResolver(forgotPasswordValidator, JoiOptions)})
    // eslint-disable-next-line react-hooks/incompatible-library
    const allFields = watch()
    const [formState, formAction] = useActionState<{success: boolean, status: number, data: IResponseMessage | IError | null}, FormData>(recoveryRequest, {data: null, success: false, status: 0})

    useEffect(() => {
        const formData = localStorage.getItem('forgotPasswordFormData')
        if(formData){
            try{
                const parsedData = JSON.parse(formData);
                reset(parsedData)
            }
            catch(e){
                console.log("Помилка парсингу даних: ", e)
            }
        }
    }, [reset, formState]);

    useEffect(() => {

        return () => {
            localStorage.removeItem('forgotPasswordFormData');
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('forgotPasswordFormData', JSON.stringify(allFields))
    }, [allFields]);

    return {register, errors, isValid, formState, formAction}
}

export default useForgotPassword