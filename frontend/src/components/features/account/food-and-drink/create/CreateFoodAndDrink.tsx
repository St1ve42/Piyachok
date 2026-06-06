'use client'
import {Button, EmptyState, Form, Input, Label, Tag, TagGroup, TextArea, Heading} from "@heroui/react";
import FoodAndDrinkTypeSelection from "@/src/components/shared/food-and-drink/type-selection/FoodAndDrinkTypeSelection";
import noImage from "@/src/public/no-image-icon.jpg";
import Image from "next/image";
import {Plus} from "@gravity-ui/icons";
import FeatureSelection from "@/src/components/shared/food-and-drink/feature-selection/FeatureSelection";
import { v4 as uuidv4 } from "uuid";
import useCreateFoodAndDrink from "@/src/components/features/account/food-and-drink/create/useCreateFoodAndDrink";
import BusinessHour from "@/src/components/shared/food-and-drink/schedule/BusinessHour";
import SuccessMark from "@/src/public/success_mark.png";
import RegionSelection from "@/src/components/shared/region-and-city/region/RegionSelection";
import CitySelection from "@/src/components/shared/region-and-city/city/CitySelection";
import GalleryFilesWithSwiper from "@/src/components/features/account/food-and-drink/create/components/GalleryFilesWithSwiper";
import GalleryFiles from "@/src/components/features/account/food-and-drink/create/components/GalleryFiles";

const CreateFoodAndDrink = () => {
    const {businessHoursFields, galleryFiles, tags, tagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown, register, handleSubmit, errors, isValid, control, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, cityInputValue, regionInputValue, handleFoodAndDrinkTypeSelection, handleFeatureCheck, regionId, handleTagInputChange, onSubmit, errorMessage, isSuccessCreateResponse, handleRegionInputChange, foodAndDrinkTypeValue} = useCreateFoodAndDrink()
    if(isSuccessCreateResponse){
        return <div className="h-[70%] flex justify-center items-center">
            <div className="w-[60%] flex flex-col items-center gap-2">
                <Image src={SuccessMark} width={100} height={100} alt={'Успіх'}/>
                <Heading level={3}>Заклад успішно створено!</Heading>
                <div className="text-center">
                    Тепер Ви можете переглянути створений заклад у вкладці &#39;Заклад&#39;
                </div>
            </div>
        </div>
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-[40vw]">
            <h1 className="font-bold text-2xl">Створення закладу</h1>
            <div className="flex flex-col gap-1 relative w-[25vw]">
                <Label isRequired htmlFor="name" className="font-bold">Назва</Label>
                <Input placeholder={'Введіть ім`я'} type="text" required={true} id="name" {...register('name')}/>
                {errors.name && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.name.message}</div>}
            </div>
            <div>
                <Label isRequired className="font-bold">Зображення</Label>
                <div className="col-span-2 mt-1">
                    {galleryFiles.length > 0 ? <GalleryFilesWithSwiper galleryFiles={galleryFiles}/> : <Image src={noImage} alt={'Зображення відсутнє'} width={150} height={150} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                            <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadFile} />
                            <div onClick={handleTriggerFileInput} className="h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer">Додати фото</div>
                        </div>
                        <GalleryFiles galleryFiles={galleryFiles} handleRemoveGallery={handleRemoveGallery}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label isRequired htmlFor="description" className="font-bold">Опис</Label>
                <TextArea id={'description'} placeholder={'Введіть опис'} className="h-[8rem]" maxLength={1000} autoCorrect={'off'} required {...register('description')}/>
                {errors.description && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.description.message}</div>}
            </div>
            <div className="w-[10vw]">
                <FoodAndDrinkTypeSelection controlledValue={foodAndDrinkTypeValue} className="font-bold" isRequired={true} handleTypeSelect={handleFoodAndDrinkTypeSelection}/>
            </div>
            <div className="flex flex-col gap-1 relative w-[12vw]">
                <Label isRequired htmlFor="averageReceipt" className="font-bold">Середній чек</Label>
                <Input id={'averageReceipt'} placeholder={'Введіть суму'} type="number" min={0} required {...register('averageReceipt', { valueAsNumber: true })}/>
                {errors.averageReceipt && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.averageReceipt.message}</div>}
            </div>
            <div className="flex flex-col gap-2 relative w-[80%]">
                <div className="flex gap-2 items-center">
                    <Label isRequired className="font-bold text-sm">Графік роботи</Label>
                    <div className="flex items-center gap-1 text-sm cursor-pointer" onClick={handleAddDay}>
                        <Plus/>
                        Додати день
                    </div>
                </div>
                {businessHoursFields.length !== 0 ? businessHoursFields.map((businessHour, index) => <BusinessHour key={businessHour.id} businessHour={businessHour} onRemove={() => handleRemoveSchedule(index)} control={control} errors={errors} register={register} index={index}/>) : <div className="text-sm">Додайте графік</div>}
                {errors.businessHours && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.businessHours.message}</div>}
            </div>
            <div className="flex gap-8">
                <RegionSelection className={'font-bold'} isRequired initialRegionInputValue={regionInputValue} regionInputValue={regionInputValue} handleRegionInputChange={handleRegionInputChange} handleRegionChange={handleRegionSelectionChange}/>
                <CitySelection className={'font-bold'} isRequired regionId={regionId} regionInputValue={regionInputValue} initialCityInputValue={cityInputValue} cityInputValue={cityInputValue} handleCityInputChange={handleCityInputChange} handleCityChange={handleCitySelectionChange}/>
            </div>
            <div className="flex flex-col gap-1 relative w-[25vw]">
                <Label isRequired htmlFor="street" className="font-bold">Адреса</Label>
                <Input id="street" placeholder={'Введіть назву вулиці'} type="text" required {...register('street')}/>
                {errors.street && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.street.message}</div>}
            </div>
            <div className="flex flex-col gap-1 relative w-[25vw]">
                <Label isRequired htmlFor="phone" className="font-bold">Номер телефону закладу</Label>
                <Input id={'phone'} placeholder={'Введіть номер телефону'} type="text" required {...register('phone')}/>
                {errors.phone && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.phone.message}</div>}
            </div>
            <div className="w-[40%]">
                <FeatureSelection handleFeatureCheck={handleFeatureCheck} isShownTextAboutOptional={true}/>
            </div>
            <div className="flex flex-col gap-3 relative">
                <Label htmlFor={'tag'} className="font-bold">Теги (не обов&#39;язково)</Label>
                <div className="flex gap-2">
                    <Input
                        id={'tag'}
                        placeholder={'Введіть тег та натисніть Enter'}
                        type="text"
                        className="w-[14.5vw]"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagInputKeyDown}
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-default-200 rounded-md hover:bg-default-300 transition"
                    >
                        <Plus/>
                    </button>
                </div>
                {errors.tag && <div className="text-red-600 text-[10px] bottom-[20px] leading-none">{errors.tag.message}</div>}
                {tags.length > 0 && (
                    <TagGroup aria-label={'Створити тег'} selectionMode="none" onRemove={(keys) => keys.forEach(tag => handleRemoveTag(tag.toString()))}>
                        <TagGroup.List
                            renderEmptyState={() => <EmptyState className="p-1">Тегів немає</EmptyState>}
                        >
                            {tags.map(tag => <Tag key={uuidv4()} id={tag} textValue={tag}>
                                {tag}
                            </Tag>)}
                        </TagGroup.List>
                    </TagGroup>
                )}
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label htmlFor="site" className="font-bold">Сайт (не обов&#39;язково)</Label>
                <Input id="site" placeholder={'Введіть назву сайту'} type="text" required = {false} {...register('site', {setValueAs: value => value === "" ? undefined : value})}/>
                {errors.site && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.site.message}</div>}
            </div>
            <div className="w-[33vw]">
                <Label className="font-bold block mb-3">Соціальні мережі (не обов&#39;язково)</Label>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">

                    <div className="flex flex-col gap-1.5 relative">
                        <Label htmlFor="instagram" className="font-bold text-sm">Інстаграм</Label>
                        <Input id="instagram" placeholder="Введіть посилання на Instagram" type="text" {...register('instagram', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.instagram && (
                            <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">
                                {errors.instagram.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                        <Label htmlFor="facebook" className="font-bold text-sm">Facebook</Label>
                        <Input id="facebook" placeholder="Введіть посилання на Facebook" type="text" {...register('facebook', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.facebook && (
                            <div className="absolute text-red-600 text-[10px] bottom-[-20px] mt-1 leading-none">
                                {errors.facebook.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 relative mt-2">
                        <Label htmlFor="x" className="font-bold text-sm">X</Label>
                        <Input id="x" placeholder="Введіть посилання на X" type="text" {...register('x', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.x && (
                            <div className="absolute text-red-600 text-[10px] bottom-[-20px] mt-1 leading-none">
                                {errors.x.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 relative mt-2">
                        <Label htmlFor="telegram" className="font-bold text-sm">Telegram</Label>
                        <Input id="telegram" placeholder="Введіть посилання на Telegram" type="text" {...register('telegram', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.telegram && (
                            <div className="absolute text-red-600 text-[10px] bottom-[-20px] mt-1 leading-none">
                                {errors.telegram.message}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="relative">
                {errorMessage && <div className="absolute text-red-600 text-[15px] top-[-10px] leading-none">{errorMessage}</div>}
                <Button type={'submit'} className={'mb-5 mt-5'} isDisabled={!isValid}>Створити</Button>
            </div>
        </Form>
    )
}

export default CreateFoodAndDrink