import { Card, CardContent, CardTitle, Chip, Label } from "@heroui/react";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {IFoodAndDrinkSuperadminInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSuperadminInfo";
import {FC} from "react";
import {statusTranslation} from "@/src/constants/status-translation";
import ReadOnlyStarRating from "@/src/components/shared/ui/ReadOnlyStarRating";

type PropsType = {
    foodAndDrink: IFoodAndDrinkOwnerInfo | IFoodAndDrinkSuperadminInfo
}

const FoodAndDrinkSystemInfo: FC<PropsType> = ({foodAndDrink}) => {
    const {createdAt, updatedAt, email, isEmailVerified, status, rating} = foodAndDrink
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
            <CardContent className="p-0 gap-1 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Label className="min-w-[90px] max-sm:min-w-[70px] text-gray-500">Створено:</Label>
                        <span className="font-medium">{createdAtDate.toLocaleDateString('uk-UA', dateOptions)}, {createdAtDate.toLocaleTimeString('uk-UA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Label className="min-w-[90px] max-sm:min-w-[70px] text-gray-500">Оновлено:</Label>
                        <span className="font-medium">{updatedAtDate.toLocaleDateString('uk-UA', dateOptions)}, {updatedAtDate.toLocaleTimeString('uk-UA')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="min-w-[40px] max-sm:min-w-[30px] text-gray-500">Рейтинг закладу:</Label>
                        {rating ? <div className="text-sm text-gray-500 flex items-center gap-1">
                            <p>{rating}</p>
                            <ReadOnlyStarRating initialValue={rating}/>
                        </div> : <p className="text-sm text-gray-500">відсутній</p>}
                    </div>
                    {'customRating' in foodAndDrink && <div className="flex items-center gap-2">
                        <Label className="min-w-[40px] max-sm:min-w-[30px] text-gray-500">Змінений рейтинг закладу:</Label>
                        {foodAndDrink.customRating ? <div className="text-sm text-gray-500 flex items-center gap-1">
                            <p>{foodAndDrink.customRating}</p>
                            <ReadOnlyStarRating initialValue={foodAndDrink.customRating}/>
                        </div> : <p className="text-sm text-gray-500">відсутній</p>}
                    </div>}
                </div>
                <div>
                    <div className="flex items-center text-sm text-gray-700 gap-2">
                        <Label className="min-w-[90px] max-sm:min-w-[70px] text-gray-500">Електронна пошта закладу:</Label>
                        <span className="break-words">{email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="min-w-[90px] max-sm:min-w-[70px] text-gray-500">Статус підтвердження електронної пошти:</Label>
                        <Chip color={isEmailVerified ? 'success' : 'danger'}>
                            {isEmailVerified ? 'підтверджено' : 'не підтверджено'}
                        </Chip>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label className="min-w-[40px] max-sm:min-w-[30px] text-gray-500">Статус закладу:</Label>
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