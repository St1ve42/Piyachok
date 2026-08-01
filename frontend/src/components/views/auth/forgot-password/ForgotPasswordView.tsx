'use client'
import Form from "next/form";
import useForgotPasswordView from "@/src/components/views/auth/forgot-password/useForgotPasswordView";
import { Button, Heading, Input, Label } from "@heroui/react";

const ForgotPasswordView = () => {
    const {register, errors, isValid, formAction, isLoading, setIsLoading, onFocus, message} = useForgotPasswordView()
    return (
        <section className="h-full flex justify-center items-center px-4 max-sm:px-2">
            <Form action={formAction} onSubmit={() => setIsLoading(true)} className="flex flex-col w-[500px] max-md:w-full max-md:max-w-[500px] p-4 max-sm:p-2 gap-5 max-sm:gap-4 items-center">
                <Heading level={3} className="text-center max-sm:text-lg">Відновлення паролю</Heading>
                <div className="w-[70%] max-sm:w-full flex flex-col gap-2">
                    <Label className="max-sm:text-sm">Електронна пошта</Label>
              <div className="w-full relative">
                        <Input onFocus={onFocus} type='email' placeholder='Введіть електронну пошту...' disabled={isLoading} {...register('email')} className="w-full"></Input>
                        {errors.email && <div className="absolute text-red-600 text-[10px] max-sm:text-[9px] leading-none bottom-[-20px]">{errors.email.message}</div>}
                        {message && <div className="absolute text-green-600 text-[10px] max-sm:text-[9px] leading-none bottom-[-40px]">{message}</div>}
                    </div>
                </div>
                <Button className="mt-10 max-sm:mt-6" type="submit" isDisabled={!isValid || isLoading}
                        style={{opacity: isValid && !isLoading ? 1 : 0.8, cursor: isValid && !isLoading ? 'pointer' : 'default'}}>
                    {isLoading ? 'Завантаження...' : 'Надіслати'}
                </Button>
            </Form>
        </section>
    )
}

export default ForgotPasswordView