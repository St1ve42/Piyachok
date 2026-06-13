'use client'
import { Button, Dropdown, Header, Label} from "@heroui/react";
import {Funnel} from "@gravity-ui/icons"
import useUserFilter from "@/src/components/features/superadmin/users/filter/useUserFilter";

const UserFilter = () => {
    const {handleFilterChange} = useUserFilter()
    return <Dropdown>
        <Button isIconOnly aria-label="Menu" variant="secondary">
            <Funnel/>
        </Button>
        <Dropdown.Popover>
            <Dropdown.Menu onAction={handleFilterChange}>
                <Dropdown.Section>
                    <Header>Шукати за: </Header>
                    <Dropdown.Item id="name" textValue="Ім`я">
                        <Label>Ім`ям</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="surname" textValue="Прізвище">
                        <Label>Прізвищем</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="email" textValue="Прізвище">
                        <Label>Імейлом</Label>
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown>;
};

export default UserFilter;
