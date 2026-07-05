'use client'
import { Button, Form, Heading, Input, Label, toast } from "@heroui/react";
import PasswordVisibilityToggle from "@/src/components/shared/ui/PasswordVisibilityToggle";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {ChangePasswordValidator} from "@/src/validators/change-password/ChangePasswordValidator";
import {IChangePasswordInput} from "@/src/interfaces/account/IChangePassword";
import {JoiOptions} from "@/src/constants/joi.options";
import {authService} from "@/src/services/auth.service";
import {useRouter} from "next/navigation";

const ChangePassword = () => {
    const [isShownPassword, setIsShownPassword]= useState<boolean>(false)
    const [isShownNewPassword, setIsShownNewPassword]= useState<boolean>(false)
    const [isShownNewRepeatedPassword, setIsShownNewRepeatedPassword]= useState<boolean>(false)
    const router = useRouter()
    const [error, setErrorMessage] = useState<string | null>(null)
    const {register, handleSubmit, formState: {isValid, errors}} = useForm<IChangePasswordInput>({mode: "all", resolver: joiResolver(ChangePasswordValidator, JoiOptions)})
    const handleChangePassword = async (data: IChangePasswordInput) => {
        const {repeatedNewPassword, ...restData} = data
        const response = await authService.changePassword(restData)
        if(!response.success){
            setErrorMessage(response.data.message)
        }
        else{
            router.refresh()
            toast(response.data.message, {
                timeout: 10*1000
            })
        }
    }
    return <section className="h-[90%] flex items-center justify-center">
        <Form onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col items-center gap-7 border-solid border-black border rounded-2xl p-5 [&_input]:w-[20vw]">
            <Heading level={3}>Зміна паролю</Heading>
            <div className="flex flex-col gap-2">
                <Label>Пароль</Label>
                <div className="relative">
                    <Input type={isShownPassword ? 'text' : 'password'} placeholder={'Введіть свій пароль'} {...register('oldPassword')}/>
                    <PasswordVisibilityToggle isShownPassword={isShownPassword} setIsShownPassword={setIsShownPassword}/>
                    {errors.oldPassword && <div className="absolute text-red-600 text-[9.5px] bottom-[-15px] leading-none mt-1">{errors.oldPassword.message}</div>}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Новий пароль</Label>
                <div className="relative">
                    <Input type={isShownNewPassword ? 'text' : 'password'} placeholder={'Введіть новий пароль'} {...register('newPassword')}/>
                    <PasswordVisibilityToggle isShownPassword={isShownNewPassword} setIsShownPassword={setIsShownNewPassword}/>
                    {errors.newPassword && <div className="absolute text-red-600 text-[9.5px] bottom-[-24px] leading-none">{errors.newPassword.message}</div>}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Повторіть пароль</Label>
                <div className="relative">
                    <Input type={isShownNewRepeatedPassword ? 'text' : 'password'} placeholder={'Введіть новий пароль'}  {...register('repeatedNewPassword')}/>
                    <PasswordVisibilityToggle isShownPassword={isShownNewRepeatedPassword} setIsShownPassword={setIsShownNewRepeatedPassword}/>
                    {errors.repeatedNewPassword && <div className="absolute text-red-600 text-[9.5px] bottom-[-20px] leading-none mt-1">{errors.repeatedNewPassword.message}</div>}
                </div>
            </div>
            <div className="relative w-full">
                {error && <div className="absolute text-red-600 text-[9.5px] bottom-[-20px] leading-none mt-1">{error}</div>}
            </div>
            <Button type={'submit'} isDisabled={!isValid}>Змінити</Button>
        </Form>
    </section>;
};

export default ChangePassword;
