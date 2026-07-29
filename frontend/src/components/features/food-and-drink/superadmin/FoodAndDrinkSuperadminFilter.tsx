'use client'
import {
  Button,
  Dropdown,
  DropdownSection,
  Header,
  Key,
  Label,
} from "@heroui/react";
import { Funnel } from "@gravity-ui/icons";
import {useURL} from "@/src/hooks/shared/useURL";

const FoodAndDrinkSuperadminFilter = () => {
    const {router, createQueryString, pathname} = useURL()
    const handleFilterChange = (key: Key | null) => {
        if(key){
            router.push(pathname + '?' + createQueryString('status', key.toString()))
        }
    }
    return (
        <Dropdown>
            <Button aria-label="filter"><Funnel/></Button>
            <Dropdown.Popover>
                <Dropdown.Menu onAction={handleFilterChange} selectionMode="single">
                    <DropdownSection>
                        <Header>Статус</Header>
                        <Dropdown.Item id={'active'} textValue={'Активний'}>
                            <Label>Активний</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id={'inactive'} textValue={'Неактивний'}>
                            <Label>Неактивний</Label>
                        </Dropdown.Item>
                    </DropdownSection>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default FoodAndDrinkSuperadminFilter