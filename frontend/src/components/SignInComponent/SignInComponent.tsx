'use client'

import Image from "next/image";
import Vision from "@/src/public/vision.png";
import unVision from "@/src/public/unvision.png";
import Link from "next/link";
import './SignInStyle.css'
import {facebookProvider, googleProvider} from "@/src/firebase/firebase.init";
import useSignIn from "@/src/components/SignInComponent/useSignIn";

const SignInComponent = () => {
    const {register, handleSubmit, errors, isValid, isShownPassword, setIsShownPassword, errorMessage, onSubmit, handleSignInWithSocialNetwork, isLoading} = useSignIn()
    return (
        <section className="h-full flex justify-center items-center ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[400px] p-4 sign-in-form gap-6 items-center">
                <h1 className='text-xl'>Вхід</h1>
                <div className="w-full relative">
                    <input type='email' placeholder='Електронна пошта' {...register('email')} disabled={isLoading}></input>
                    {errors.email && <div className="absolute text-red-600 text-[10px] leading-none self-start mt-1">{errors.email.message}</div>}
                </div>
                <div className="relative w-full">
                    <input type={isShownPassword ? 'text' : 'password'} placeholder='Пароль' className='w-full pr-10 psw' {...register('password')} disabled={isLoading}></input>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
                        <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
                            setIsShownPassword(true)
                        }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
                        <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
                    </div>
                    {errors.password && <div className="absolute text-red-600 text-[10px] leading-none self-start mt-1">{errors.password.message}</div>}
                    {errorMessage && <div className="absolute text-red-600 text-[10px] leading-none mt-7 self-start">{errorMessage}</div>}
                </div>
                <button type="submit" className="sign-up-btn bg-black text-white mt-10" disabled={!isValid || isLoading}
                        style={{opacity: (isValid && !isLoading) ? 1 : 0.8, cursor: (isValid && !isLoading) ? 'pointer' : 'default'}}>
                    {isLoading ? 'Загрузка...' : 'Увійти'}
                </button>
                <div className="flex justify-between items-center w-full gap-4">
                    {/* Контейнер для кнопок */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSignInWithSocialNetwork(googleProvider)}
                            className="flex justify-center items-center gap-1 border-2 border-solid border-black rounded-[20px] p-2 hover:bg-gray-50 transition-all"
                        >
                            <p className="text-xs w-[130px]">Увійти через Google</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleSignInWithSocialNetwork(facebookProvider)}
                            className="flex justify-center items-center gap-1 border-2 border-solid border-black rounded-[20px] p-2 hover:bg-gray-50 transition-all"
                        >
                            <p className="text-xs w-[140px]">Увійти через Facebook</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14222 14222">
                                <circle cx="7111" cy="7112" r="7111" fill="#1977f3"/>
                                <path d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z" fill="#fff"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <Link href = {'/auth/forgot-password'} className="text-blue-600 self-end">Забули пароль?</Link>
            </form>
        </section>
    )
}

export default SignInComponent
