import {FC} from "react";
import {notFound} from "next/navigation";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import {IError} from "@/src/interfaces/shared/IError";
import { Button, Surface } from "@heroui/react";
import Image from "next/image";
import Success from "@/src/public/success_mark.png";
import Link from "next/link";

type PropsType = {
    token?: string
}

const ConfirmFoodAndDrinkEmailView: FC<PropsType> = async ({token}) => {
    if(!token) return notFound()
    const confirmEmailResponse = await foodAndDrinkService.confirmEmail(token);
    const {success, status} = confirmEmailResponse
    let {data} = confirmEmailResponse
    if(!success){
        data = data as IError
        switch (status) {
            case 401:
                return <div>${data.message}</div>
            case 409:
                return <div>${data.message}</div>
        }
    }
    return <section className="h-full flex flex-col justify-center items-center p-4 max-sm:p-2">
        <Surface className="w-[600px] max-sm:w-full max-md:max-w-[90%] mb-5 flex justify-center items-center flex-col gap-5 max-sm:gap-3 p-6 max-sm:p-4"><Image src={Success} alt={'Успіх'} width={100} height={100} className="max-sm:w-[80px] max-sm:h-[80px]"/>
            <div className="w-full text-[2.5rem] max-sm:text-2xl max-md:text-3xl text-center">
                Заклад успішно активований!
            </div>
            <Button className="max-sm:w-full">
                <Link href={'/account/food-and-drink'}>Перейти на закладу</Link>
            </Button></Surface>
    </section>
}

export default ConfirmFoodAndDrinkEmailView