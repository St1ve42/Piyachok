import { Card, CardContent, CardTitle, Chip, Label } from "@heroui/react";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {IFoodAndDrinkSuperadminInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSuperadminInfo";
import {FC} from "react";
import {statusTranslation} from "@/src/constants/status-translation";

type PropsType = {
    foodAndDrink: IFoodAndDrinkOwnerInfo | IFoodAndDrinkSuperadminInfo
}

const FoodAndDrinkSystemInfo: FC<PropsType> = ({foodAndDrink}) => {
    const {createdAt, updatedAt, email, isEmailVerified, status} = foodAndDrink
    const offset = -(new Date().getTimezoneOffset())
    const createdAtDate = new Date(new Date(createdAt).getTime() + offset*60*1000)
    const updatedAtDate = new Date(new Date(updatedAt).getTime() + offset*60*1000)
    const dateOptions: {[key: string]: string} = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Europe/Kyiv",
    };
    return (
        <Card>
            <CardTitle>Реєстраційна інформація</CardTitle>
            <CardContent className="p-0 gap-1 flex-row justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Label className="min-w-[90px] text-gray-500">Створено:</Label>
                        <span className="font-medium">{createdAtDate.toLocaleDateString('uk-UA', dateOptions)}, {createdAtDate.toLocaleTimeString('uk-UA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Label className="min-w-[90px] text-gray-500">Оновлено:</Label>
                        <span className="font-medium">{updatedAtDate.toLocaleDateString('uk-UA', dateOptions)}, {updatedAtDate.toLocaleTimeString('uk-UA')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 gap-2">
                        <Label className="min-w-[90px] text-gray-500">Електронна пошта закладу:</Label>
                        <span className="break-words">{email}</span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <Label className="min-w-[90px] text-gray-500">Статус підтвердження електронної пошти:</Label>
                        <Chip color={isEmailVerified ? 'success' : 'danger'}>
                            {isEmailVerified ? 'підтверджено' : 'не підтверджено'}
                        </Chip>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="min-w-[40px] text-gray-500">Статус закладу:</Label>
                        <Chip color={'success'}>
                            {statusTranslation[status]}
                        </Chip>
                    </div>

                </div>
            </CardContent>

        </Card>
    )
}

export default FoodAndDrinkSystemInfo