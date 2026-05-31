import {Input, ListBox, Select, TagRemoveButton} from "@heroui/react";
import {FoodAndDrinkDaysEnum} from "@/src/enums/food-and-drink/food-and-drink-days.enum";
import {Control, Controller, FieldErrors, UseFormRegister} from "react-hook-form";
import {ICreateFoodAndDrink} from "@/src/interfaces/food-and-drink/ICreateFoodAndDrink";

type IBusinessHours = {
    id: string
}

const BusinessHour = ({onRemove, control, register, errors, index}: {businessHour: IBusinessHours, onRemove: () => void, control:  Control<ICreateFoodAndDrink & {
        tag: string
    }, any, ICreateFoodAndDrink & {
        tag: string
    }>, index: number, register: UseFormRegister<ICreateFoodAndDrink & {
        tag: string;
    }>, errors: FieldErrors<ICreateFoodAndDrink>}) => {
    return (<div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 mt-3 items-center w-full justify-center">
        <div className="relative">
            <Controller
                control={control}
                name={`businessHours.${index}.day`}
                render={({ field }) => (
                    <Select {...field} aria-label={'Вибір графіку роботи'} className="w-full" placeholder="Виберіть день:">
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="h-[200px]">
                            <ListBox>
                                {Object.values(FoodAndDrinkDaysEnum).map(day =>
                                    <ListBox.Item key={day} id={day} textValue={day}>
                                        {day}
                                        <ListBox.ItemIndicator/>
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                )}
            />
            {errors.businessHours?.[index]?.day && (
                <div className="absolute text-red-600 text-[10px] leading-tight mt-0.5 left-0 whitespace-nowrap">
                    {errors.businessHours[index].message}
                </div>
            )}
        </div>

        <div className="relative">
            <Input
                className="w-full"
                placeholder="09:00"
                type="text"
                maxLength={5}
                required
                {...register(`businessHours.${index}.open`)}
            />
            {errors.businessHours?.[index]?.open && (
                <div className="absolute text-red-600 text-[10px] leading-tight mt-0.5 left-0 whitespace-nowrap">
                    {errors.businessHours[index].open.message}
                </div>
            )}
        </div>

        <div className="relative">
            <Input
                className="w-full"
                placeholder="22:00"
                type="text"
                maxLength={5}
                required
                {...register(`businessHours.${index}.close`)}
            />
            {errors.businessHours?.[index]?.close && (
                <div className="absolute text-red-600 text-[10px] leading-tight mt-0.5 left-0 whitespace-nowrap">
                    {errors.businessHours[index].close.message}
                </div>
            )}
        </div>

        <div className="flex-shrink-0 ml-auto">
            <TagRemoveButton onClick={() => onRemove()}/>
        </div>
    </div>)
}

export default BusinessHour