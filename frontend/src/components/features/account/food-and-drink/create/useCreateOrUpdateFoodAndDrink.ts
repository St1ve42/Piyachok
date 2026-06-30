import {ChangeEvent, KeyboardEventHandler, useEffect, useMemo, useRef, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {
  ICreateFoodAndDrink,
  ICreateFoodAndDrinkDto,
} from "@/src/interfaces/food-and-drink/ICreateFoodAndDrink";
import {joiResolver} from "@hookform/resolvers/joi";
import {createFoodAndDrinkValidator} from "@/src/validators/food-and-drink/create-food-and-drink.validator";
import {JoiOptions} from "@/src/constants/joi.options";
import {Key} from "@heroui/react";
import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import Joi from "joi";
import {foodAndDrinkService} from "@/src/services/food-and-drink.service";
import { IFoodAndDrinkOwnerInfo } from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import { redirect, useRouter} from "next/navigation";
import { utils } from "@/src/services/utils.service";

type PropsType = { mode: 'create' | 'update', foodAndDrink?: IFoodAndDrinkOwnerInfo}

const useCreateOrUpdateFoodAndDrink = ({mode, foodAndDrink}: PropsType) => {
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
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

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
    useEffect(() => {
        if(mode === 'update' && foodAndDrink){
          const {images, businessHours, features, tags, city, region, type} = foodAndDrink
          if(tags){
            setTags(tags)
          }
          if(features){
            setFeatures(features)
          }
          if(images){
            Promise.all(images.map(async image => await utils.urlToFile(utils.buildStorageURL(image), image))).then(images => setGalleryFiles(images))
          }
          setRegionInputValue(region)
          setCityInputValue(city)
          setFoodAndDrinkTypeValue(type)
          setValue('type', type)
          appendBusinessHour(businessHours, {shouldFocus: false})
        }
    }, []);

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
          setError("tag", { message: undefined });
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

    const onRegionIdMatch = (id?: number) => {
      setRegionId(id)
    }

    const handleCityInputChange = (value: string) => {
        setCityInputValue(value)
    }

    const handleCitySelectionChange = (value: Key | null) => {
        if(value){
            setValue('cityId', Number(value), {shouldValidate: true})
        }
    }

    const allFormValues = watch();

    useEffect(() => {
        if(mode === 'create'){
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
        }
    }, [mode, reset]);

    useEffect(() => {
      if (mode === "create" && !isSuccessCreateResponse) {
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
      }
    }, [allFormValues, cityInputValue, regionInputValue, tags, foodAndDrinkTypeValue, mode]);

    const handleCreateFormSubmit = async (data: ICreateFoodAndDrink) => {
        setIsLoading(true)
        if(galleryFiles.length === 0){
          setErrorMessage('Фотографії закладу є необхідні.')
            setIsLoading(false)
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
                setIsLoading(false)
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
            setIsLoading(false)
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
                setIsLoading(false)
                return
            }
        }
        router.refresh()
        setIsSuccessCreateResponse(true)
        setIsLoading(false)
        localStorage.removeItem('foodAndDrinkCreatingDraft')
    }

    const handleUpdateFormSubmit = async (data: ICreateFoodAndDrink) => {
        setIsLoading(true)
        if(!foodAndDrink){
            setIsLoading(false)
            return
        }
        const {street, instagram, facebook, telegram, x, phone, ...restData} = data
        const updateData: Partial<ICreateFoodAndDrinkDto> = restData
        const socialNetworks: Pick<ICreateFoodAndDrink, "instagram" | "facebook" | "x" | "telegram"> = {instagram, facebook, telegram, x}
        if(street !== foodAndDrink['location']['street']){
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
                    setIsLoading(false)
                  return
                }
              }
          updateData['location'] = {street, coordinates: coordinatesResponse.data}
        }
        if(phone !== foodAndDrink.phone){
          updateData['phone'] = phone
        }
        updateData['socialNetworks'] = socialNetworks
        const {id} = foodAndDrink
        const updateResponse = await foodAndDrinkService.update(id, updateData)
        if(!updateResponse.success){
            setErrorMessage(updateResponse.data.message)
            setIsLoading(false)
            return
        }
        if(galleryFiles.length !== 0){
            const formData = new FormData()
            galleryFiles.forEach(file => {
                formData.append('images', file)
            })
            const uploadImagesResponse = await foodAndDrinkService.uploadImages(id, formData)
            if(!uploadImagesResponse.success){
                setErrorMessage(uploadImagesResponse.data.message)
                setIsLoading(false)
                return
            }
        }
        redirect('/account/food-and-drink')
    }

  return {businessHoursFields, galleryFiles, tags, tagInput, setTagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown, register, handleSubmit, errors, isValid, control, handleRegionInputChange, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, cityInputValue, regionInputValue, handleFoodAndDrinkTypeSelection, handleFeatureCheck, regionId, handleTagInputChange, handleCreateFormSubmit, errorMessage, isSuccessCreateResponse, foodAndDrinkTypeValue, handleUpdateFormSubmit, setRegionInputValue, onRegionIdMatch, isLoading}
}

export default useCreateOrUpdateFoodAndDrink