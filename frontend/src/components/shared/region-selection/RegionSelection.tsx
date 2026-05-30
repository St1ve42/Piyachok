import {Collection, ComboBox, ComboBoxProps, Input, Label, ListBox} from "@heroui/react";
import {useRegionQuery} from "@/src/tanstack-query-hooks/useRegionQuery";
import {FC, useEffect, useState} from "react";
import {ICommonData} from "@/src/interfaces/shared/ICommonData";

interface PropsType extends Omit<ComboBoxProps<ICommonData>, 'children'>{
    initialRegionInputValue: string;
    isRequired?: boolean
}

const RegionSelection: FC<PropsType> = ({initialRegionInputValue, isRequired = false, ...restProps}) => {
    const [regionInputValue, setRegionInputValue] = useState<string>(initialRegionInputValue)
    const [debouncedRegionInputValue, setDebouncedRegionInputValue] = useState<string>(initialRegionInputValue)
    const regionQuery = useRegionQuery({search: debouncedRegionInputValue})
    const regionData = regionQuery.data
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedRegionInputValue(regionInputValue), 500)
        return () => clearTimeout(timer)
    }, [regionInputValue]);
    const handleRegionInputChange = (value: string) => {
        setRegionInputValue(value)
    }
    return  <ComboBox inputValue={regionInputValue} onInputChange={handleRegionInputChange} {...restProps}>
        <Label isRequired={isRequired} className="font-bold">Регіон</Label>
        <ComboBox.InputGroup>
            <Input placeholder={'Введіть регіон'}/>
            <ComboBox.Trigger/>
        </ComboBox.InputGroup>
        <ComboBox.Popover>
            <ListBox>
                <Collection items={regionData?.data}>
                    {(region) =>
                        <ListBox.Item id={region.id} textValue={region.name}>
                            {region.name}
                        </ListBox.Item>
                    }
                </Collection>
            </ListBox>
        </ComboBox.Popover>
    </ComboBox>
}

export default RegionSelection