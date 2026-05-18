'use client'
import {Label, ListBox, Select} from "@heroui/react";
import useFoodAndDrinkSort from "@/src/components/features/food-and-drink/sort/useFoodAndDrinkSort";

const FoodAndDrinkSort = () => {
    const {sort, sortBy, handleChangeSortBy, handleChangeSort} = useFoodAndDrinkSort()
    return (
        <div className="flex gap-3">
            <Select className="w-[180px]" placeholder="Сортувати за:" value={sortBy} onChange = {handleChangeSortBy}>
                <Label/>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="reset" textValue="скинути">
                            Сортувати за:
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="rating" textValue="рейтинг">
                            Рейтингом
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="averageReceipt" textValue="Середній чек">
                            Середнім чеком
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="createdAt" textValue="Дата створення">
                            Датою створення
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="name" textValue="Назва">
                            Назвою
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="distance" textValue="Відстань">
                            Відстанню
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
            <Select className="w-[180px]" placeholder="Сортувати в порядку:" isDisabled={sortBy === 'distance'} value={sort} onChange = {handleChangeSort}>
                <Label/>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item id="reset" textValue="скинути">
                            Сортувати в порядку:
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="asc" textValue="Зростання">
                            Зростання
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="desc" textValue="Спадання">
                            Спадання
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    )
}

export default FoodAndDrinkSort





