'use client'
import Form from "next/form";
import './ForgotPasswordStyle.css'
import useForgotPassword from "@/src/components/ForgotPasswordComponent/useForgotPassword";

const ForgotPasswordComponent = () => {
    const {register, errors, isValid, formState, formAction} = useForgotPassword()
    return (
        <section className="h-full flex justify-center items-center">
            <Form action={formAction} className="flex flex-col w-[400px] p-4 forgot-password-form gap-5 items-center">
                <h1 className='text-xl'>Введіть пошту для відновлення паролю</h1>
                <div className="relative w-full">
                    <input type='email' placeholder='Електронна пошта' {...register('email')}></input>
                    {errors.email && <div className="absolute text-red-600 text-[10px] leading-none self-start mt-1">{errors.email.message}</div>}
                    {formState.data && <div className="absolute text-red-600 text-[10px] leading-none mt-5">{formState.data.message}</div>}
                </div>
                <button type="submit" className="forgot-password-btn bg-black text-white mt-11" disabled={!isValid}
                        style={{opacity: isValid ? 1 : 0.8, cursor: isValid ? 'pointer' : 'default'}}>
                    Надіслати
                </button>
            </Form>
        </section>
    )
}

export default ForgotPasswordComponent