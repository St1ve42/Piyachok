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
import {FC} from "react";
import {FoodAndDrinkStatusEnum} from "@/src/enums/food-and-drink/food-and-drink-status.enum";

type PropsType = {
    status?: FoodAndDrinkStatusEnum
}

const FoodAndDrinkSuperadminFilter: FC<PropsType> = ({status}) => {
    const {router, createQueryString, pathname} = useURL()
    const handleFilterChange = (key: Key | null) => {
        if(key){
            const query = createQueryString('page', '1', 'set')
            router.push(pathname + '?' + createQueryString('status', key.toString(), 'set', query))
        }
    }
    return (
        <Dropdown>
            <Button aria-label="filter" variant="secondary"><Funnel/></Button>
            <Dropdown.Popover>
                <Dropdown.Menu selectedKeys={status ? new Set([status]) : new Set()} onAction={handleFilterChange} selectionMode="single">
                    <DropdownSection>
                        <Header>Статус</Header>
                        <Dropdown.Item id={'active'} textValue={'Активний'}>
                            <Dropdown.ItemIndicator />
                            <Label>Активний</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id={'inactive'} textValue={'Неактивний'}>
                            <Dropdown.ItemIndicator />
                            <Label>Неактивний</Label>
                        </Dropdown.Item>
                    </DropdownSection>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default FoodAndDrinkSuperadminFilter