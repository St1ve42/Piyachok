'use client'
import {Button, EmptyState, Form, Input, Label, Tag, TagGroup, TextArea, ComboBox, ListBox, Collection} from "@heroui/react";
import FoodAndDrinkTypeSelection from "@/src/components/shared/food-and-drink-type-selection/FoodAndDrinkTypeSelection";
import noImage from "@/src/public/no-image-icon.jpg";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import {Plus} from "@gravity-ui/icons";
import FeatureSelection from "@/src/components/shared/feature-selection/FeatureSelection";
import { v4 as uuidv4 } from "uuid";
import useCreateFoodAndDrink from "@/src/components/features/account/create-food-and-drink/useCreateFoodAndDrink";
import BusinessHour from "@/src/components/shared/schedule/BusinessHour";
import RegionSelection from "@/src/components/shared/region-selection/RegionSelection";

const CreateFoodAndDrink = () => {
    const {schedules, galleryFiles, tags, tagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown, register, handleSubmit, errors, isValid, control, cityData, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, cityInputValue, regionInputValue, handleFoodAndDrinkTypeSelection, handleFeatureCheck, regionId, handleTagInputChange} = useCreateFoodAndDrink()
    const onSubmit = (data: unknown) => {
        console.log(data)
        console.log(galleryFiles)
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
            <h1 className="font-bold text-2xl">Створення закладу</h1>
            <div className="flex flex-col gap-1 relative">
                <Label isRequired htmlFor="name" className="font-bold">Назва</Label>
                <Input placeholder={'Введіть ім`я'} type="text" required={true} id="name" {...register('name')}/>
                {errors.name && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.name.message}</div>}
            </div>
            <div>
                <Label isRequired className="font-bold">Зображення</Label>
                <div className="col-span-2 mt-1">
                    {galleryFiles.length > 0 ? <div className="relative rounded-md overflow-hidden">
                        <Swiper className="relative w-full h-[25rem] bg-gray-100"
                                modules={[Navigation, Pagination]}
                                spaceBetween={50}
                                navigation={true}
                                pagination={true}
                                loop={galleryFiles.length > 1}
                                slidesPerView={1}
                        >
                            {galleryFiles.map((image => <SwiperSlide key={uuidv4()}><Image src={URL.createObjectURL(image)} alt={image.name} fill className="object-cover"/></SwiperSlide>))}
                        </Swiper>
                    </div> : <Image src={noImage} alt={'Зображення відсутнє'} width={150} height={150} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                            <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadFile} />
                            <div onClick={handleTriggerFileInput} className="h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer">Додати фото</div>
                        </div>
                        {galleryFiles.map((file, index) => (
                                <div key={uuidv4()} className="h-20 rounded-md overflow-hidden relative">
                                    <Image src={URL.createObjectURL(file)} alt={file.name} width={150} height={150} className="w-full h-full object-cover"/>
                                    <button onClick={() => handleRemoveGallery(index)} className="absolute top-1 right-1 bg-white rounded-full p-1">✕</button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label isRequired htmlFor="description" className="font-bold">Опис</Label>
                <TextArea id={'description'} placeholder={'Введіть опис'} className="h-[8rem]" maxLength={1000} autoCorrect={'off'} required {...register('description')}/>
                {errors.description && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.description.message}</div>}
            </div>
            <div className="w-[60%]">
                <FoodAndDrinkTypeSelection isRequired={true} handleTypeSelect={handleFoodAndDrinkTypeSelection}/>
            </div>
            <div className="flex flex-col gap-1 relative">
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
                {schedules.length !== 0 ? schedules.map((schedule, index) => <BusinessHour key={schedule.id} businessHour={schedule} onRemove={handleRemoveSchedule} control={control} errors={errors} register={register} index={index}/>) : <div className="text-sm">Додайте графік</div>}
                {errors.businessHours && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.businessHours.message}</div>}
            </div>
            <div className="flex gap-8">
                <RegionSelection isRequired={true} initialRegionInputValue={regionInputValue} onSelectionChange={handleRegionSelectionChange}/>
                <ComboBox inputValue={cityInputValue} onInputChange={handleCityInputChange} isDisabled={!regionId} onSelectionChange={handleCitySelectionChange}>
                    <Label>Місто</Label>
                    <ComboBox.InputGroup>
                        <Input placeholder={'Введіть місто'}/>
                        <ComboBox.Trigger/>
                    </ComboBox.InputGroup>
                    {errors.cityId && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.cityId.message}</div>}
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
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label isRequired htmlFor="street" className="font-bold">Адреса</Label>
                <Input id="street" placeholder={'Введіть назву вулиці'} type="text" required {...register('street')}/>
                {errors.street && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.street.message}</div>}
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label isRequired htmlFor="phone" className="font-bold">Номер телефону закладу</Label>
                <Input id={'phone'} placeholder={'Введіть номер телефону'} type="text" required {...register('phone')}/>
                {errors.phone && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.phone.message}</div>}
            </div>
            <div className="w-[40%]">
                <FeatureSelection handleFeatureCheck={handleFeatureCheck} isShownTextAboutOptional={true}/>
            </div>
            <div className="flex flex-col gap-3 relative">
                <Label htmlFor={'tag'} className="font-bold">Теги (не обов'язково)</Label>
                <div className="flex gap-2">
                    <Input
                        id={'tag'}
                        placeholder={'Введіть тег та натисніть Enter'}
                        type="text"
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
                <Label htmlFor="site" className="font-bold">Сайт (не обов'язково)</Label>
                <Input id="site" placeholder={'Введіть назву сайту'} type="text" required = {false} {...register('site')}/>
                {errors.site && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.site.message}</div>}
            </div>
            <div className="w-[70%]">
                <Label className="font-bold block mb-3">Соціальні мережі (не обов'язково)</Label>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">

                    {/* Instagram */}
                    <div className="flex flex-col gap-1.5 relative">
                        <Label htmlFor="instagram" className="font-bold text-sm">Інстаграм</Label>
                        <Input id="instagram" placeholder="Введіть посилання на Instagram" type="text" {...register('instagram', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.instagram && (
                            <div className="absolute text-red-600 text-[10px] text-[10px] bottom-[-20px] leading-none">
                                {errors.instagram.message}
                            </div>
                        )}
                    </div>

                    {/* Facebook */}
                    <div className="flex flex-col gap-1.5 relative">
                        <Label htmlFor="facebook" className="font-bold text-sm">Facebook</Label>
                        <Input id="facebook" placeholder="Введіть посилання на Facebook" type="text" {...register('facebook', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.facebook && (
                            <div className="absolute text-red-600 text-[10px] bottom-[-20px] mt-1 leading-none">
                                {errors.facebook.message}
                            </div>
                        )}
                    </div>

                    {/* X (Twitter) */}
                    <div className="flex flex-col gap-1.5 relative mt-2">
                        <Label htmlFor="x" className="font-bold text-sm">X</Label>
                        <Input id="x" placeholder="Введіть посилання на X" type="text" {...register('x', {setValueAs: value => value === "" ? undefined : value})}/>
                        {errors.x && (
                            <div className="absolute text-red-600 text-[10px] bottom-[-20px] mt-1 leading-none">
                                {errors.x.message}
                            </div>
                        )}
                    </div>

                    {/* Telegram */}
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
            <Button type={'submit'} className={'self-end mb-5'} isDisabled={!isValid}>Створити</Button>
        </Form>
    )
}

export default CreateFoodAndDrink