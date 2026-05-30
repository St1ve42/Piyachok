import {ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {IBusinessHour} from "@/src/components/shared/schedule/BusinessHour";
import {useForm} from "react-hook-form";
import {ICreateFoodAndDrink} from "@/src/interfaces/food-and-drink/ICreateFoodAndDrink";
import {joiResolver} from "@hookform/resolvers/joi";
import {createFoodAndDrinkValidator} from "@/src/validators/food-and-drink/create-food-and-drink.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {useCityQuery} from "@/src/tanstack-query-hooks/useCityQuery";
import {Key} from "@heroui/react";
import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import Joi from "joi";

const useCreateFoodAndDrink = () => {
    const [schedules, setSchedules] = useState<IBusinessHour[]>([])
    const [galleryFiles, setGalleryFiles] = useState<File[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>([])
    const [tagInput, setTagInput] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [regionInputValue, setRegionInputValue] = useState<string>('')
    const [regionId, setRegionId] = useState<number | undefined>(undefined)
    const [cityInputValue, setCityInputValue] = useState<string>('')
    const [debouncedCityInputValue, setDebouncedCityInputValue] = useState<string>('')

    const {register, handleSubmit, control, watch, formState: {errors, isValid}, setValue, setError} = useForm<ICreateFoodAndDrink & {tag: string}>({
        resolver: joiResolver(createFoodAndDrinkValidator, JoiOptions),
        mode: 'all'
    })

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedCityInputValue(cityInputValue), 500)
        return () => clearTimeout(timer)
    }, [cityInputValue]);

    const cityQuery = useCityQuery({search: debouncedCityInputValue, regionId})
    const cityData = cityQuery.data

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(galleryFiles.length < 10){
            if (!e.target.files) return
            const file = e.target.files[0]
            if (file) {
                setGalleryFiles(prev => [...prev, file])
            }
        }
    }
    const handleRemoveGallery = (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index))
    }
    const handleTriggerFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }
    const handleAddDay = () => {
        if(schedules.length < 7){
            const newSchedule: IBusinessHour = {
                id: `schedule-${uuidv4()}`
            }
            setSchedules(prev => [...prev, newSchedule])
        }
    }

    const handleFoodAndDrinkTypeSelection = (key: Key | null) => {
        if(key){
            setValue('type', key.toString() as FoodAndDrinkTypeEnum)
        }
    }

    const handleFeatureCheck = (feature: string) => {
        return (isSelected: boolean) => {
            let featuresToSet = [...features];
            if(isSelected){
                featuresToSet = [...featuresToSet, feature]
            }
            else{
                featuresToSet.splice(featuresToSet.indexOf(feature, 1))
            }
            setFeatures(featuresToSet)
            setValue('features', featuresToSet.length > 0 ? featuresToSet : undefined)
        }
    }

    const handleRemoveSchedule = (id: string) => {
        const businessHours = schedules.filter(schedule => schedule.id !== id)
        setSchedules(businessHours)
        setValue('businessHours', businessHours)
    }

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim()
        if(tags.includes(trimmedTag)){
            setError('tag', {message: 'Тег не може повторюватись'})
            return
        }
        if (trimmedTag) {
            setTags(prev => [...prev, trimmedTag])
            setTagInput('')
            setValue('tags', [...tags, trimmedTag], {shouldValidate: true})
        }
    }

    const handleTagInputChange: ((e: ChangeEvent<T, HTMLInputElement>) => void) = (e) => {
        const value = e.target.value
        setTagInput(value)
        const {error} = Joi.string().min(3).max(50).validate(value, JoiOptions)
        if(error){
            setError('tag', {message: error.message})
        }
        else{
            setError('tag', undefined)
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove)
        setTags(updatedTags)
        setValue('tags', updatedTags.length > 0 ? updatedTags : [])
    }

    const handleTagInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleRegionInputChange = (value: string) => {
        if(cityInputValue) {
            setCityInputValue('')
        }
        setRegionInputValue(value)
    }

    const handleRegionSelectionChange = (value: Key | null) => {
        if(value){
            setRegionId(Number(value))
        }
    }

    const handleCityInputChange = (value: string) => {
        setCityInputValue(value)
    }

    const handleCitySelectionChange = (value: Key | null) => {
        if(value){
            setValue('cityId', Number(value))
        }
    }

    const allFormValues = watch();
    useEffect(() => {
        console.log(allFormValues)
        const { error } = createFoodAndDrinkValidator.validate(allFormValues, { abortEarly: false });

        if (error) {
            console.log("🛑 ВСІ ПОМИЛКИ ВАЛІДАЦІЇ JOI (НАПРЯМУ):");
            console.table(
                error.details.map(detail => ({
                    Поле: detail.path.join('.'),
                    Помилка: detail.message,
                    Тип: detail.type
                }))
            );
        } else {
            console.log("✅ Схема Joi каже: ФОРМА ПОВНІСТЮ ВАЛІДНА");
        }
    }, [allFormValues]);

    return {schedules, galleryFiles, tags, tagInput, setTagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown, register, handleSubmit, errors, isValid, control, cityData, handleRegionInputChange, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, cityInputValue, regionInputValue, handleFoodAndDrinkTypeSelection, handleFeatureCheck, regionId, handleTagInputChange}
}

export default useCreateFoodAndDrink