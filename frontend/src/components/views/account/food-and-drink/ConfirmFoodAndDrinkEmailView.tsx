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
    return <section className="h-full flex justify-center items-center">
        <Surface className="w-[600px] mb-5 flex justify-center items-center flex-col gap-5"><Image src={Success} alt={'Успіх'} width={100} height={100}/>
            <div className="w-full text-[2.5rem] text-center">
                Заклад успішно активований!
            </div>
            <Button>
                <Link href={'/account/food-and-drink'}>Перейти на закладу</Link>
            </Button></Surface>
    </section>
}

export default ConfirmFoodAndDrinkEmailView