'use client'
import {Button, Label, Slider, SliderFill, SliderOutput, SliderThumb, SliderTrack} from "@heroui/react";
import useFoodAndDrinkFiltration from "@/src/components/features/food-and-drink/filtration/useFoodAndDrinkFiltration";
import FoodAndDrinkTypeSelection from "@/src/components/shared/food-and-drink/type-selection/FoodAndDrinkTypeSelection";
import FeatureSelection from "@/src/components/shared/food-and-drink/feature-selection/FeatureSelection";

const FoodAndDrinkFiltration = () => {
    const {formKey, setFormKey, pathname, router, handleTypeSelect, handleFeatureCheck, handleRatingSelect, handleAverageReceiptSelect} = useFoodAndDrinkFiltration()
    return (
        <div className="flex p-4 flex-col gap-8 fixed z-10" key={formKey}>
            <h1 className="self-center">Фільтрувати</h1>
            <FoodAndDrinkTypeSelection handleTypeSelect={handleTypeSelect}/>
            <FeatureSelection handleFeatureCheck={handleFeatureCheck}/>
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