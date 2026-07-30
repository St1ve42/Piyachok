'use client'
import {Label, ListBox, Select} from "@heroui/react";
import useUserSort from "@/src/components/features/users/sort/useUserSort";
import {SortEnum} from "@/src/enums/shared/SortEnum";
import {FC} from "react";

type PropsType = {
    initialSortBy?: string,
    initialSort?: SortEnum
}

const UserSort: FC<PropsType> = (props) => {
    const {sort, sortBy, handleChangeSortBy, handleChangeSort} = useUserSort(props)
    return (
        <div className="flex gap-3">
            <Select className="w-[160px]" placeholder="Сортувати за:" value={sortBy} onChange = {handleChangeSortBy}>
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
                        <ListBox.Item id="name" textValue="ім'я">
                            Ім&#39;ям
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="email" textValue="імейл">
                            Імейлом
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="createdAt" textValue="Дата створення">
                            Датою створення
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="updatedAt" textValue="Дата оновлення">
                            Датою оновлення
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
            <Select className="w-[180px]" placeholder="Сортувати в порядку:" value={sort} onChange = {handleChangeSort}>
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

export default UserSort





