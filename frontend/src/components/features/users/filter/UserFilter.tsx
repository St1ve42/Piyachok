'use client'
import { Button, Dropdown, Header, Label} from "@heroui/react";
import {Funnel} from "@gravity-ui/icons"
import useUserFilter from "@/src/components/features/users/filter/useUserFilter";
import {UserSearchByEnum} from "@/src/enums/user/user-search-by.enum";
import {FC} from "react";

type PropsType = {
    searchBy: UserSearchByEnum
}

const UserFilter: FC<PropsType> = ({searchBy}) => {
    const {handleFilterChange} = useUserFilter()
    return <Dropdown>
        <Button isIconOnly aria-label="Menu" variant="secondary">
            <Funnel/>
        </Button>
        <Dropdown.Popover>
            <Dropdown.Menu onAction={handleFilterChange} selectedKeys={new Set([searchBy])} selectionMode={'single'}>
                <Dropdown.Section>
                    <Header>Шукати за: </Header>
                    <Dropdown.Item id="name" textValue="Ім`я">
                        <Dropdown.ItemIndicator />
                        <Label>Ім`ям</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="surname" textValue="Прізвище">
                        <Dropdown.ItemIndicator />
                        <Label>Прізвищем</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="email" textValue="Прізвище">
                        <Dropdown.ItemIndicator />
                        <Label>Імейлом</Label>
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown>;
};

export default UserFilter;
