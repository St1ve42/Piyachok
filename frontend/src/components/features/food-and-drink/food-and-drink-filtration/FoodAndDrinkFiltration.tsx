'use client'
import {Button, Checkbox, Form, Label, ListBox, Select, Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack} from "@heroui/react";
import {useTypes} from "@/src/useQuery/useTypes";
import {useFeatures} from "@/src/useQuery/useFeatures";
import {useState} from "react";

const FoodAndDrinkFiltration = () => {
    const typesQuery = useTypes()
    const featuresQuery = useFeatures()
    const [rating, setRating] = useState(0)
    const [averageReceiptRange, setAverageReceiptRange] = useState<number[] | []>([])
    if(typesQuery.isLoading || featuresQuery.isLoading){
        return <div>Завантаження...</div>
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string | object> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        data['rating'] = `${rating}`
        data['averageReceipt'] = {gte: `${averageReceiptRange[0]}`, lte: `${averageReceiptRange[1]}`}
        console.log(data)
    };
    return (
        <Form className="flex p-2 flex-col gap-4" onSubmit={onSubmit}>
            <h1 className="self-center">Фільтрувати</h1>
            <Select className="w-full" name="type" placeholder="Виберіть тип">
                <Label>Тип</Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="h-[200px]">
                    <ListBox>
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
                <div className="grid grid-cols-2">
                    {featuresQuery.data && featuresQuery.data.success && featuresQuery.data.data.map(feature => <div key={feature}>
                        <Checkbox id={feature} name={feature} value='true'>
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
                defaultValue={0}
                maxValue={10}
                value={rating} onChange={(rating) => setRating(rating as number)}
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
                    onChange = {(averageReceiptRange) => setAverageReceiptRange(averageReceiptRange as number[])}
                >
                    <SliderOutput />
                    <SliderTrack className="h-2 bg-gray-200 rounded-full px-0">
                        <SliderFill className="bg-blue-600 h-full rounded-full" />
                        {/* 2. Додаємо два повзунки для діапазону */}
                        <SliderThumb index={0} className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md" />
                        <SliderThumb index={1} className="w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-md" />
                    </SliderTrack>
                </Slider>
            </div>
            <Button className="self-center mt-4" type="submit">Застосувати</Button>
        </Form>
    )
}

export default FoodAndDrinkFiltration