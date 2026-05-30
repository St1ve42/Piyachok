import {Collection, ComboBox, Input, Label, ListBox} from "@heroui/react";
import {useCityQuery} from "@/src/tanstack-query-hooks/useCityQuery";

const CitySelection = () => {
    const cityQuery = useCityQuery({search: debouncedCityInputValue, regionId})
    const cityData = cityQuery.data
    return <ComboBox inputValue={cityInputValue} onInputChange={handleCityInputChange} isDisabled={!isOpenEdit || !regionInputValue} onSelectionChange={handleCitySelectionChange}>
        <Label>Місто</Label>
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