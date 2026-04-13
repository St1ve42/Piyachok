'use client'
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {JoiOptions} from "@/src/constants/joi.options";
import {useState} from "react";
import './RecoveryPasswordStyle.css'
import Image from "next/image";
import Vision from "@/src/public/vision.png";
import unVision from "@/src/public/unvision.png";
import {authService} from "@/src/services/auth.service";
import {recoveryValidator} from "@/src/validators/recovery.validator";
import {IRecovery} from "@/src/interfaces/auth/IRecovery";
import {useRouter} from "next/navigation";

type PropsType = {
    token: string
}

const RecoveryPasswordComponent = ({token}: PropsType) => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IRecovery>({mode: 'all', resolver: joiResolver(recoveryValidator, JoiOptions)})
    const [isShownPassword, setIsShownPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()
    const onSubmit = async (data: IRecovery) => {
        try {
            const result = await authService.recovery(data, token)
            console.log(result)
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
    return (
        <section className="h-full flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[400px] p-4 recovery-password-form gap-5 items-center">
                <h1 className='text-xl'>Введіть новий пароль</h1>
                <div className="relative w-full">
                    <input type={isShownPassword ? 'text' : 'password'} placeholder='Пароль' className='w-full pr-10 psw' {...register('password')}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownPassword(true)
                        }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
                    </div>
                </div>
                {errors.password && <div className="text-red-600 text-xs leading-none self-start">{errors.password.message}</div>}
                {errorMessage && <div className="text-red-600 text-xs leading-none">{errorMessage}</div>}
                <button type="submit" className="recovery-password-btn bg-black text-white" disabled={!isValid}
                        style={{opacity: isValid ? 1 : 0.8, cursor: isValid ? 'pointer' : 'default'}}>
                    Надіслати
                </button>
            </form>
        </section>
    )
}

export default RecoveryPasswordComponent