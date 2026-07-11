'use client'
import Form from "next/form";
import './ForgotPasswordStyle.css'
import useForgotPassword from "@/src/components/views/auth/forgot-password/useForgotPassword";
import { Button, Heading, Input, Label } from "@heroui/react";

const ForgotPassword = () => {
    const {register, errors, isValid, formAction, isLoading, setIsLoading, onFocus, message} = useForgotPassword()
    return (
        <section className="h-full flex justify-center items-center">
            <Form action={formAction} onSubmit={() => setIsLoading(true)} className="flex flex-col w-[500px] p-4 gap-5 items-center">
                <Heading level={3} className="text-center">Відновлення паролю</Heading>
                <div className="w-[70%] flex flex-col gap-2">
                    <Label>Електронна пошта</Label>
              <div className="w-full relative">
                        <Input onFocus={onFocus} type='email' placeholder='Введіть електронну пошту...' disabled={isLoading} {...register('email')} className="w-full"></Input>
                        {errors.email && <div className="absolute text-red-600 text-[10px] leading-none bottom-[-20px]">{errors.email.message}</div>}
                        {message && <div className="absolute text-green-600 text-[10px] leading-none bottom-[-40px]">{message}</div>}
                    </div>
                </div>
                <Button className="mt-10" type="submit" isDisabled={!isValid || isLoading}
                        style={{opacity: isValid && !isLoading ? 1 : 0.8, cursor: isValid && !isLoading ? 'pointer' : 'default'}}>
                    {isLoading ? 'Завантаження...' : 'Надіслати'}
                </Button>
            </Form>
        </section>
    )
}

export default ForgotPassword