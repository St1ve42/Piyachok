'use client'

import {FC} from "react";
import {Button, Form, Input, Label, TextArea} from "@heroui/react";
import useNewsCreatingOrUpdatingView from "./useNewsCreatingOrUpdatingView";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";
import MyImage from "@/src/components/shared/components/image/MyImage";

type Props = { mode?: 'create' | 'update', news?: IGeneralNewsById, foodAndDrinkId?: string}

const NewsCreatingOrUpdatingView: FC<Props> = ({mode = 'create', news, foodAndDrinkId}) => {
    const {register, handleSubmit, errors, isValid, isLoading, photoPreview, handleCreateFormSubmit, handleUpdateFormSubmit, handlePhotoClear, handlePhotoSelect, isDirty, textLength, handleChangeText} = useNewsCreatingOrUpdatingView({mode, news, foodAndDrinkId})

    const submitLabel = mode === 'create' ? 'Створити' : 'Оновити'

    return (
        <Form onSubmit={handleSubmit(mode === 'create' ? handleCreateFormSubmit : handleUpdateFormSubmit)} className="flex flex-col gap-6 max-sm:gap-4 w-[30vw] max-lg:w-full max-lg:max-w-[500px] max-sm:px-4">
            <h1 className="font-bold text-2xl max-sm:text-xl">{mode === 'create' ? 'Створити новину' : 'Оновити новину'}</h1>

            <div className="flex flex-col gap-2 max-sm:gap-1">
                <Label isRequired className="font-bold max-sm:text-sm">Фото</Label>
                        <div className="w-full h-48 max-sm:h-32 border-2 border-dashed rounded-[40px] max-sm:rounded-2xl flex items-center justify-center overflow-hidden relative">
                            {photoPreview ? (
                                <>
                                    <MyImage photoPreview={photoPreview}/>
                                    <div className="absolute top-2 right-2">
                                        <Button type="button" onClick={() => handlePhotoClear()} className="!px-2 max-sm:!px-1 !py-1 max-sm:!py-0.5 text-xs max-sm:text-[10px]">Видалити</Button>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500">
                                    <span className="max-sm:text-sm">Натисніть або перетягніть фото</span>
                                    <input type="file" accept="image/jpeg,image/jpg,image/png" className="hidden" onChange={(e) => handlePhotoSelect(e.target.files)} />
                                </label>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm max-sm:text-xs text-gray-600">Одна фотографія. Формати: jpg, jpeg, png. Максимум 1 МБ.</div>
                        </div>
            </div>

            <div className="flex flex-col gap-2 max-sm:gap-1 relative w-full">
                <Label isRequired htmlFor="title" className="font-bold max-sm:text-sm">Заголовок</Label>
                <Input id="title" placeholder={'Введіть заголовок...'} type="text" required className="max-sm:text-sm" {...register('title')} />
                {errors.title && <div className="absolute text-red-600 text-[12px] max-sm:text-[10px] bottom-[-20px] leading-none">{errors.title.message}</div>}
            </div>


            <div className="flex flex-col gap-2 max-sm:gap-1 relative w-full">
                <Label isRequired htmlFor="text" className="font-bold max-sm:text-sm">Текст</Label>
                <TextArea id={'text'} placeholder={'Введіть текст новини...'} className="h-[10rem] max-sm:h-[8rem] resize-none max-sm:text-sm" maxLength={1000} required {...register('text', {onChange: handleChangeText})} />
                <div className="text-sm absolute bottom-[-28px] right-0">{textLength}/1000</div>
                {errors.text && <div className="absolute text-red-600 text-[12px] max-sm:text-[10px] bottom-[-20px] leading-none">{errors.text.message}</div>}
            </div>


            <div className="relative mb-2">
                <Button type={'submit'} className={'mt-4 max-sm:mt-2 max-sm:w-full'} isDisabled={!isValid || isLoading || !photoPreview || !isDirty}>{submitLabel}</Button>
            </div>
        </Form>
    )
}

export default NewsCreatingOrUpdatingView