'use client'
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {JoiOptions} from "@/src/constants/joi.options";
import Form from "next/form";
import {useActionState, useEffect} from "react";
import {IRecoveryRequest} from "@/src/interfaces/auth/IRecoveryRequest";
import {IResponseMessage} from "@/src/interfaces/shared/IResponseMessage";
import {IError} from "@/src/interfaces/shared/IError";
import {recoveryRequest} from "@/src/actions/auth.actions";
import './ForgotPasswordStyle.css'
import {forgotPasswordValidator} from "@/src/validators/forgot-password.validator";
import {useSearchParams} from "next/navigation";

const ForgotPasswordComponent = () => {
    const {register, watch, reset, formState: {errors, isValid}} = useForm<IRecoveryRequest>({mode: 'all', resolver: joiResolver(forgotPasswordValidator, JoiOptions)})
    const allFields = watch()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
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
    }, [reset]);

    useEffect(() => {
        localStorage.setItem('forgotPasswordFormData', JSON.stringify(allFields))
    }, [allFields]);

    return (
        <section className="h-full flex justify-center items-center">
            <Form action={formAction} className="flex flex-col w-[400px] p-4 forgot-password-form gap-5 items-center">
                <h1 className='text-xl'>Введіть пошту для відновлення паролю</h1>
                <input type='email' placeholder='Електронна пошта' {...register('email')}></input>
                {errors.email && <div className="text-red-600 text-xs leading-none self-start">{errors.email.message}</div>}
                <button type="submit" className="forgot-password-btn bg-black text-white" disabled={!isValid}
                        style={{opacity: isValid ? 1 : 0.8, cursor: isValid ? 'pointer' : 'default'}}>
                    Надіслати
                </button>
                {formState.data && <div className="text-red-600 text-xs leading-none">{formState.data.message}</div>}
            </Form>
        </section>
    )
}

export default ForgotPasswordComponent