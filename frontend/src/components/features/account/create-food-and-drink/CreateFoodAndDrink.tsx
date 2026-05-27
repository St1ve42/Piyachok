'use client'
import {Button, EmptyState, Form, Input, Label, Tag, TagGroup, TextArea} from "@heroui/react";
import FoodAndDrinkTypeSelection from "@/src/components/shared/food-and-drink-type-selection/FoodAndDrinkTypeSelection";
import noImage from "@/src/public/no-image-icon.jpg";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import {Plus} from "@gravity-ui/icons";
import FeatureSelection from "@/src/components/shared/feature-selection/FeatureSelection";
import { v4 as uuidv4 } from "uuid";
import useCreateFoodAndDrink from "@/src/components/features/account/create-food-and-drink/useCreateFoodAndDrink";
import Schedule from "@/src/components/shared/schedule/Schedule";

const CreateFoodAndDrink = () => {
    const {schedules, galleryFiles, tags, tagInput, setTagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown} = useCreateFoodAndDrink()
    return (
        <Form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8 w-full [&_input]:w-[60%]">
            <h1 className="font-bold text-2xl">Створення закладу</h1>
            <div className="flex flex-col gap-1 relative">
                <Label htmlFor="name" className="font-bold">Назва</Label>
                <Input placeholder={'Введіть ім\'я'} type="text" required={true} id="name"/>
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div>
                <div className="col-span-2">
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
                <Label htmlFor="description" className="font-bold">Опис</Label>
                <TextArea id={'description'} placeholder={'Введіть опис'} className="h-[8rem]" maxLength={1000} autoCorrect={'off'} required/>
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div className="w-[60%]">
                <FoodAndDrinkTypeSelection/>
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label htmlFor="averageReceipt" className="font-bold">Середній чек</Label>
                <Input id={'averageReceipt'} placeholder={'Введіть суму'} type="number" min={0} required/>
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div className="w-[40%]">
                <FeatureSelection/>
            </div>
            <div className="flex flex-col gap-2 relative w-[70%]">
                <div className="flex gap-2 items-center">
                    <h1 className="font-bold text-sm">Графік роботи</h1>
                    <div className="flex items-center gap-1 text-sm cursor-pointer" onClick={handleAddDay}>
                        <Plus/>
                        Додати день
                    </div>
                </div>
                {schedules.length !== 0 ? schedules.map(schedule => <Schedule key={schedule.id} schedule={schedule} onRemove={handleRemoveSchedule}/>) : <div className="text-sm">Додайте графік</div>}
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div className="flex flex-col gap-3 relative">
                <Label htmlFor={'tag'} className="font-bold">Теги (3-50 символів)</Label>
                <div className="flex gap-2 w-[60%]">
                    <Input
                        id={'tag'}
                        placeholder={'Введіть тег та натисніть Enter'}
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
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
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label htmlFor="street" className="font-bold">Адреса розташування</Label>
                <Input id="street" placeholder={'Введіть назву вулиці'} type="text" required/>
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label htmlFor="phone" className="font-bold">Номер телефону закладу</Label>
                <Input id={'phone'} placeholder={'Введіть номер телефону'} type="text" required/>
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <div className="flex flex-col gap-1 relative">
                <Label htmlFor="site" className="font-bold">Сайт</Label>
                <Input id="site" placeholder={'Введіть назву сайту'} type="text" required = {false}/>
                <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">Помилка</div>
            </div>
            <Button type={'submit'} className={'self-end mb-5'}>Створити</Button>
        </Form>
    )
}

export default CreateFoodAndDrink