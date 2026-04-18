'use client'
import './RecoveryPasswordStyle.css'
import Image from "next/image";
import Vision from "@/src/public/vision.png";
import unVision from "@/src/public/unvision.png";
import useRecoveryPassword from "@/src/components/RecoveryComponent/useRecoveryPassword";

type PropsType = {
    token: string
}

const RecoveryPasswordComponent = ({token}: PropsType) => {
    const {isLoading, register, handleSubmit, errors, isShownPassword, setIsShownPassword, isShownRepeatedPassword, setIsShownRepeatedPassword, errorMessage, isValid, onSubmit} = useRecoveryPassword({token})
    return (
        <section className="h-full flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[400px] p-4 recovery-password-form gap-7 items-center">
                <h1 className='text-xl'>Введіть новий пароль</h1>
                <div className="relative w-full">
                    <input type={isShownPassword ? 'text' : 'password'} placeholder='Пароль' className='w-full pr-10 psw' disabled={isLoading} {...register('password')}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownPassword(true)
                        }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
                    </div>
                    {errors.password && <div className="absolute text-red-600 text-[10px] leading-none self-start mt-1">{errors.password.message}</div>}
                </div>
                <div className="relative mt-[5px] w-full">
                    <input type={isShownRepeatedPassword ? 'text' : 'password'} placeholder='Повторіть пароль' className='w-full pr-10 psw' disabled={isLoading} {...register('repeatedPassword')}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownRepeatedPassword(true)
                        }} style={{display: !isShownRepeatedPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownRepeatedPassword(false)} style={{display: isShownRepeatedPassword ? 'block' : 'none'}}/>
                    </div>
                    {errors.repeatedPassword && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.repeatedPassword.message}</div>}
                    {errorMessage && <div className="absolute text-red-600 text-[10px] leading-none mt-7">{errorMessage}</div>}
                </div>
                <button type="submit" className="recovery-password-btn bg-black text-white mt-10" disabled={!isValid || isLoading}
                        style={{opacity: isValid && !isLoading ? 1 : 0.8, cursor: isValid && !isLoading ? 'pointer' : 'default'}}>
                    {isLoading ? 'Завантаження...' : 'Надіслати'}
                </button>
            </form>
        </section>
    )
}

export default RecoveryPasswordComponent