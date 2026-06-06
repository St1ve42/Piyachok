import {ChangeEvent, KeyboardEventHandler, useEffect, useMemo, useRef, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {ICreateFoodAndDrink} from "@/src/interfaces/food-and-drink/ICreateFoodAndDrink";
import {joiResolver} from "@hookform/resolvers/joi";
import {createFoodAndDrinkValidator} from "@/src/validators/food-and-drink/create-food-and-drink.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {Key} from "@heroui/react";
import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import Joi from "joi";
import {utils} from "@/src/services/utils.service";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";

const useCreateFoodAndDrink = () => {
    const [galleryFiles, setGalleryFiles] = useState<File[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>([])
    const [tagInput, setTagInput] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [regionId, setRegionId] = useState<number | undefined>(undefined)
    const [cityInputValue, setCityInputValue] = useState<string>('')
    const [foodAndDrinkTypeValue, setFoodAndDrinkTypeValue] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isSuccessCreateResponse, setIsSuccessCreateResponse] = useState<boolean>(false)
    const [regionInputValue, setRegionInputValue] = useState<string>('')

    const {register, handleSubmit, reset, control, watch, formState: {errors, isValid}, setValue, setError} = useForm<ICreateFoodAndDrink & {tag: string}>({
        resolver: joiResolver(createFoodAndDrinkValidator, JoiOptions),
        mode: 'all',
        defaultValues: {
            businessHours: undefined
        }
    })

    const {fields: businessHoursFields, append: appendBusinessHour, remove: removeBusinessHour} = useFieldArray({
        control,
        name: 'businessHours'
    })

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(galleryFiles.length < 10){
            if (!e.target.files) return
            const file = e.target.files[0]
            if (file) {
                setGalleryFiles(prev => [...prev, file])
            }
        }
    }
    const handleRemoveGallery = useMemo(() => {
      return (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index))
      }
    }, [])
    const handleTriggerFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }
    const handleAddDay = () => {
        if(businessHoursFields.length < 7){
            appendBusinessHour({day: '', open: '', close: ''})
        }
    }

    const handleFoodAndDrinkTypeSelection = (key: Key | null) => {
        if(key){
            setValue('type', key.toString() as FoodAndDrinkTypeEnum)
            setFoodAndDrinkTypeValue(key.toString() as FoodAndDrinkTypeEnum)
        }
    }

    const handleFeatureCheck = (feature: string) => {
        return (isSelected: boolean) => {
            let featuresToSet = [...features];
            if(isSelected){
                featuresToSet = [...featuresToSet, feature]
            }
            else{
                featuresToSet.splice(featuresToSet.indexOf(feature), 1)
            }
            setFeatures(featuresToSet)
            setValue('features', featuresToSet.length > 0 ? featuresToSet : undefined)
        }
    }

    const handleRemoveSchedule = (index: number) => {
        removeBusinessHour(index)
    }

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim()
        if (trimmedTag && !errors.tag?.message) {
            setTags(prev => [...prev, trimmedTag])
            setTagInput('')
            setValue('tags', [...tags, trimmedTag], {shouldValidate: true})
        }
    }

    const handleTagInputChange: ((e: ChangeEvent<HTMLInputElement>) => void) = (e) => {
        const value = e.target.value
        setTagInput(value)
        const trimmedTag = value.trim()
        if(tags.includes(trimmedTag)){
            setError('tag', {message: 'Тег не може повторюватись'})
            return
        }
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
        const foodAndDrinkCreatingDraft = localStorage.getItem('foodAndDrinkCreatingDraft')
        if(foodAndDrinkCreatingDraft){
            const parsedFoodAndDrinkCreatingDraft = JSON.parse(foodAndDrinkCreatingDraft) as ICreateFoodAndDrink & {regionInputValue?: string, cityInputValue?: string, foodAndDrinkTypeValue?: FoodAndDrinkTypeEnum}
            const {tags, regionInputValue, cityInputValue, foodAndDrinkTypeValue, ...restParsedFoodAndDrinkCreatingDraft} = parsedFoodAndDrinkCreatingDraft
            reset(restParsedFoodAndDrinkCreatingDraft)
            if(tags){
                setTags(tags)
            }
            if(regionInputValue){
                setRegionInputValue(regionInputValue)
            }

            if(cityInputValue){
                setCityInputValue(cityInputValue)
            }
            if(foodAndDrinkTypeValue){
                setFoodAndDrinkTypeValue(foodAndDrinkTypeValue)
            }
        }
    }, [reset]);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem(
              "foodAndDrinkCreatingDraft",
              JSON.stringify({
                ...allFormValues,
                regionInputValue,
                cityInputValue,
                tags: tags.length !== 0 ? tags : undefined,
                foodAndDrinkTypeValue,
              }),
            );
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [allFormValues, cityInputValue, regionInputValue, tags, foodAndDrinkTypeValue]);

    const onSubmit = async (data: ICreateFoodAndDrink) => {
        if(galleryFiles.length === 0){
          setErrorMessage('Фотографії закладу є необхідні.')
          return
        }
        const {instagram, facebook, x, telegram, street, ...restData} = data
        let coordinatesResponse = await utils.getCoordinates({
            region: regionInputValue,
            city: cityInputValue,
            street
        })
        if(!coordinatesResponse.success){
            coordinatesResponse = await utils.getCoordinates({
                region: regionInputValue,
                city: cityInputValue,
            })
            if(!coordinatesResponse.success){
                setErrorMessage(coordinatesResponse.data.message)
                return
            }
        }
        const createResponse = await foodAndDrinkService.create({
            ...restData,
            location: {
                street,
                coordinates: coordinatesResponse.data
            },
            socialNetworks: {
                instagram,
                facebook,
                telegram,
                x
            }
        })
        if(!createResponse.success){
            setErrorMessage(createResponse.data.message)
            return
        }
        if(galleryFiles.length !== 0){
            const {id} = createResponse.data
            const formData = new FormData()
            galleryFiles.forEach(file => {
                formData.append('images', file)
            })
            const uploadImagesResponse = await foodAndDrinkService.uploadImages(id, formData)
            if(!uploadImagesResponse.success){
                setErrorMessage(uploadImagesResponse.data.message)
                return
            }
        }
        localStorage.removeItem('foodAndDrinkCreatingDraft')
        setIsSuccessCreateResponse(true)
    }

    useEffect(() => {
      console.log('Значення форми:')
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

    return {businessHoursFields, galleryFiles, tags, tagInput, setTagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown, register, handleSubmit, errors, isValid, control, handleRegionInputChange, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, cityInputValue, regionInputValue, handleFoodAndDrinkTypeSelection, handleFeatureCheck, regionId, handleTagInputChange, onSubmit, errorMessage, isSuccessCreateResponse, foodAndDrinkTypeValue}
}

export default useCreateFoodAndDrink