import {
  Collection,
  ComboBox,
  Input,
  Key,
  Label,
  LabelRootProps,
  ListBox,
} from "@heroui/react";
import {useCityQuery} from "@/src/hooks/tanstack-query/useCityQuery";
import {FC, useEffect, useState} from "react";

type PropsType = {
    regionId: number | undefined
    regionInputValue: string
    initialCityInputValue: string
    cityInputValue: string;
    handleCityInputChange: (city: string) => void
    handleCityChange: (city: Key | null) => void
    isDisabled?: boolean
} & LabelRootProps

const CitySelection: FC<PropsType> = ({regionId, initialCityInputValue, cityInputValue, handleCityInputChange, handleCityChange, regionInputValue, isDisabled = false, ...restLabelProps}) => {
    const [debouncedCityInputValue, setDebouncedCityInputValue] = useState<string>(initialCityInputValue)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedCityInputValue(cityInputValue), 500)
        return () => clearTimeout(timer)
    }, [cityInputValue]);
    const cityQuery = useCityQuery({search: debouncedCityInputValue, regionId})
    const cityData = cityQuery.data
    return <ComboBox inputValue={cityInputValue} onInputChange={handleCityInputChange} isDisabled={isDisabled || !regionInputValue} onChange={handleCityChange}>
        <Label {...restLabelProps}>Місто</Label>
        <ComboBox.InputGroup>
            <Input placeholder={'Введіть місто'}/>
            <ComboBox.Trigger/>
        </ComboBox.InputGroup>
        <ComboBox.Popover>
            <ListBox>
                <Collection items={cityData?.data}>
                    {(city) =>
                        <ListBox.Item id={city.id} textValue={city.name}>
                            {city.name}
                        </ListBox.Item>
                    }
                </Collection>
            </ListBox>
        </ComboBox.Popover>
    </ComboBox>
}

export default CitySelection