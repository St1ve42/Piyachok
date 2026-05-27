import {Input, ListBox, Select, TagRemoveButton} from "@heroui/react";
import {FoodAndDrinkDaysEnum} from "@/src/enums/food-and-drink/food-and-drink-days.enum";

export interface ISchedule {
    id: string
}

const Schedule = ({schedule, onRemove}: {schedule: ISchedule, onRemove: (id: string) => void}) => {
    return (<div className="flex gap-3 mt-1 items-center">
        <Select aria-label={'Вибір графіку роботи'} className="w-[50%]" name="type" placeholder="Виберіть день:">
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="h-[200px]">
                <ListBox>
                    {Object.values(FoodAndDrinkDaysEnum).map(day =>
                        <ListBox.Item key={day} id={day} textValue={day}>
                            {day}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    )}
                </ListBox>
            </Select.Popover>
        </Select>
        <Input placeholder={'Час відкриття'} type="text" required/>
        <Input placeholder={'Час закриття'} type="text" required/>
        <TagRemoveButton onClick={() => onRemove(schedule.id)}/>
    </div>)
}

export default Schedule