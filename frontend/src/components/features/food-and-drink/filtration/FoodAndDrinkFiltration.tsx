'use client'
import {Button, Checkbox, Label, ListBox, Select, Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack} from "@heroui/react";
import useFoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/useFoodAndDrinkFiltration";

const FoodAndDrinkFiltration = () => {
    const {formKey, setFormKey, typesQuery, featuresQuery, pathname, router, handleTypeSelect, handleFeatureCheck, handleRatingSelect, handleAverageReceiptSelect} = useFoodAndDrinkFiltration()
    if(typesQuery.isLoading || featuresQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <div className="flex p-4 flex-col gap-8 fixed z-10" key={formKey}>
            <h1 className="self-center">Фільтрувати</h1>
            <Select className="w-full" name="type" placeholder="Виберіть тип:" onChange = {handleTypeSelect}>
                <Label>Тип</Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="h-[200px]">
                    <ListBox>
                        <ListBox.Item id={'reset'} textValue={'reset'}>
                            Виберіть тип:
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                        {typesQuery.data && typesQuery.data.success && typesQuery.data.data.map(type =>
                            <ListBox.Item key={type} id={type} textValue={type}>
                                {type}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        )}
                    </ListBox>
                </Select.Popover>
            </Select>
            <div>
                <Label>Особливості</Label>
                <div className="grid grid-cols-2 gap-3">
                    {featuresQuery.data && featuresQuery.data.success && featuresQuery.data.data.map(feature => <div key={feature}>
                        <Checkbox id={feature} name={'features[]'} value={feature} onChange={handleFeatureCheck(feature)}>
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Content>
                                <Label htmlFor={feature}>{feature}</Label>
                            </Checkbox.Content>
                        </Checkbox>
                    </div>)}
                </div>
            </div>
            <Slider
                maxValue={10}
                aria-label="Рейтинг"
                onChangeEnd = {handleRatingSelect}
            >
                <Label>
                    Рейтинг
                </Label>
                <SliderOutput />
                <SliderTrack>
                    <SliderFill />
                    <SliderThumb className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md" />
                </SliderTrack>
            </Slider>
            <div>
                <Label>Діапазон середнього чеку</Label>
                <Slider
                    className="w-full max-w-xs"
                    defaultValue={[
                        0,
                        5000
                    ]}
                    formatOptions={{
                        currency: 'UAH',
                        style: 'currency'
                    }}
                    maxValue={5000}
                    minValue={0}
                    step={100}
                    onChangeEnd = {handleAverageReceiptSelect}
                    aria-label="Діапазон середнього чеку"
                >
                    <SliderOutput />
                    <SliderTrack className="h-2 bg-gray-200 rounded-full px-0">
                        <SliderFill className="bg-blue-600 h-full rounded-full" />
                        <SliderThumb index={0} className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md" />
                        <SliderThumb index={1} className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md" />
                    </SliderTrack>
                </Slider>
            </div>
            <Button className="self-center mt-4" onClick={() => {
                router.push(pathname)
                setFormKey(prev => prev + 1);
            }}>Очистити</Button>
        </div>
    )
}

export default FoodAndDrinkFiltration