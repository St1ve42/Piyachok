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
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ICityData } from "@/src/interfaces/region-city/ICityData";

type PropsType = {
    regionId: number | undefined
    regionInputValue: string
    initialCityInputValue: string
    cityInputValue: string;
    handleCityInputChange: (city: string) => void
    handleCityChange: (city: Key | null) => void
    setRegionInputValue?: Dispatch<SetStateAction<string>>
    isDisabled?: boolean
} & LabelRootProps

const CitySelection: FC<PropsType> = ({regionId, initialCityInputValue, cityInputValue, handleCityInputChange, handleCityChange, regionInputValue, setRegionInputValue, isDisabled = false, ...restLabelProps}) => {
    const [debouncedCityInputValue, setDebouncedCityInputValue] = useState<string>(initialCityInputValue)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedCityInputValue(cityInputValue), 500)
        return () => clearTimeout(timer)
    }, [cityInputValue]);
    console.log(regionId);
    const cityQuery = useCityQuery({search: debouncedCityInputValue, regionId}) as  UseQueryResult<ICityData, Error>
    const cityData = cityQuery.data
    useEffect(() => {
        if(cityData){
          const city = cityData.data.find(city => city.name === cityInputValue)
          if(city){
            handleCityChange(city.id)
          }
        }
    }, [cityData]);
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