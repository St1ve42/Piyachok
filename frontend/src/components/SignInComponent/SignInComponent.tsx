'use client'

import {useForm} from "react-hook-form";
import {ISignIn} from "@/src/interfaces/auth/ISignIn";
import Image from "next/image";
import Vision from "@/src/public/vision.png";
import unVision from "@/src/public/unvision.png";
import {useEffect, useState} from "react";
import Link from "next/link";
import './SignInStyle.css'
import {joiResolver} from "@hookform/resolvers/joi";
import {signInValidator} from "@/src/validators/sign-in.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useRouter} from "next/navigation";
import {authService} from "@/src/services/auth.service";

const defaultSignInValues = {
    email: '',
    password: ''
};

const SignInComponent = () => {
    const {register, watch, reset, handleSubmit, formState: {errors, isValid}} = useForm<ISignIn>({mode: 'all', resolver: joiResolver(signInValidator, JoiOptions), defaultValues: defaultSignInValues})
    const [isShownPassword, setIsShownPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()
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

    const onSubmit = async (data: ISignIn) => {
        setIsLoading(true)
        setErrorMessage(null)
        try {
            const result = await authService.signIn(data)
            if (result.success) {
                localStorage.removeItem('signInFormData')
                setIsSuccessfullySubmitted(true)
                router.push('/')
                router.refresh()
            } else {
                setErrorMessage(result.data && 'message' in result.data ? result.data.message : 'Помилка входу')
            }
        } catch (error) {
            setErrorMessage('Помилка підключення до сервера')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="h-full flex justify-center items-center ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[400px] p-4 sign-in-form gap-5 items-center">
                <h1 className='text-xl'>Вхід</h1>
                <input type='email' placeholder='Електронна пошта' {...register('email')} disabled={isLoading}></input>
                {errors.email && <div className="text-red-600 text-xs leading-none self-start">{errors.email.message}</div>}
                <div className="relative w-full">
                    <input type={isShownPassword ? 'text' : 'password'} placeholder='Пароль' className='w-full pr-10 psw' {...register('password')} disabled={isLoading}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownPassword(true)
                        }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
                    </div>
                </div>
                {errors.password && <div className="text-red-600 text-xs leading-none self-start">{errors.password.message}</div>}
                {errorMessage && <div className="text-red-600 text-xs leading-none">{errorMessage}</div>}
                <button type="submit" className="sign-up-btn bg-black text-white" disabled={!isValid || isLoading}
                        style={{opacity: (isValid && !isLoading) ? 1 : 0.8, cursor: (isValid && !isLoading) ? 'pointer' : 'default'}}>
                    {isLoading ? 'Загрузка...' : 'Увійти'}
                </button>
                <Link href = {'/auth/forgot-password'} className="text-blue-600 self-end">Забули пароль?</Link>
            </form>
        </section>
    )
}

export default SignInComponent
