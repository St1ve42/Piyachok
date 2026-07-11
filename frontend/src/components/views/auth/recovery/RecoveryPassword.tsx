'use client'
import './RecoveryPasswordStyle.css'
import Image from "next/image";
import Vision from "@/src/public/vision.png";
import unVision from "@/src/public/unvision.png";
import useRecoveryPassword from "@/src/components/views/auth/recovery/useRecoveryPassword";
import { Heading, Input, Label, Button } from "@heroui/react";

type PropsType = {
    token: string
}

const RecoveryPassword = ({token}: PropsType) => {
    const {isLoading, register, handleSubmit, errors, isShownPassword, setIsShownPassword, isShownRepeatedPassword, setIsShownRepeatedPassword, errorMessage, isValid, onSubmit} = useRecoveryPassword({token})
    return (
        <section className="h-full flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[400px] p-4 gap-7 items-center">
                <Heading level={3}>Відновлення паролю</Heading>
                <div className="w-full">
                    <Label>Пароль</Label>
                    <div className="relative">
                        <Input type={isShownPassword ? 'text' : 'password'} placeholder='Введіть пароль...' className='w-full pr-10 psw' disabled={isLoading} {...register('password')}></Input>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                            <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                                setIsShownPassword(true)
                            }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                            <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
                        </div>
                        {errors.password && <div className="absolute text-red-600 text-[10px] leading-none self-start mt-1">{errors.password.message}</div>}
                    </div>
                </div>
                <div className="relative mt-[5px] w-full">
                    <Label>Повторіть пароль</Label>
                    <div className="relative">
                        <Input type={isShownRepeatedPassword ? 'text' : 'password'} placeholder='Введіть пароль...' className='w-full pr-10 psw' disabled={isLoading} {...register('repeatedPassword')}></Input>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                            <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                                setIsShownRepeatedPassword(true)
                            }} style={{display: !isShownRepeatedPassword ? 'block' : 'none'}}/>
                            <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownRepeatedPassword(false)} style={{display: isShownRepeatedPassword ? 'block' : 'none'}}/>
                        </div>
                        {errors.repeatedPassword && <div className="absolute text-red-600 text-[10px] leading-none mt-1">{errors.repeatedPassword.message}</div>}
                    </div>
                    {errorMessage && <div className="absolute text-red-600 text-[10px] leading-none mt-2">{errorMessage}</div>}
                </div>
                <Button type="submit" className="w-full mt-1" isDisabled={!isValid || isLoading}
                        style={{opacity: isValid && !isLoading ? 1 : 0.8, cursor: isValid && !isLoading ? 'pointer' : 'default'}}>
                    {isLoading ? 'Завантаження...' : 'Відновити'}
                </Button>
            </form>
        </section>
    )
}

export default RecoveryPassword