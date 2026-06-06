import {
  Collection,
  ComboBox,
  Input,
  Key,
  Label,
  LabelRootProps,
  ListBox,
} from "@heroui/react";
import {FC, useEffect, useState} from "react";
import {useRegionQuery} from "@/src/hooks/tanstack-query/useRegionQuery";

type PropsType = {
    initialRegionInputValue: string
    regionInputValue: string;
    handleRegionInputChange: (region: string) => void
    handleRegionChange: (region: Key | null) => void
    onRegionIdMatch?: (id: number | undefined) => void
    isDisabled?: boolean
} & LabelRootProps

const RegionSelection: FC<PropsType> = ({initialRegionInputValue, regionInputValue, handleRegionInputChange, handleRegionChange, onRegionIdMatch, isDisabled = false, ...restLabelProps}) => {
    const [debouncedRegionInputValue, setDebouncedRegionInputValue] = useState<string>(initialRegionInputValue)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedRegionInputValue(regionInputValue), 500)
        return () => clearTimeout(timer)
    }, [regionInputValue]);
    const regionQuery = useRegionQuery({search: debouncedRegionInputValue})
    const regionData = regionQuery.data

    useEffect(() => {
        if (regionData?.data && onRegionIdMatch) {
            const matchedRegion = regionData.data.find(region => region.name === debouncedRegionInputValue);
            onRegionIdMatch(matchedRegion?.id);
        }
    }, [debouncedRegionInputValue, onRegionIdMatch, regionData?.data]);
    return (
        <ComboBox inputValue={regionInputValue} onInputChange={handleRegionInputChange} onChange={handleRegionChange}>
            <Label {...restLabelProps}>Регіон</Label>
            <ComboBox.InputGroup>
                <Input placeholder={'Введіть регіон'} disabled={isDisabled}/>
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
    )
}

export default RegionSelection