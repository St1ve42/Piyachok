'use client'

import {FC} from "react";
import {Button, Form, Input, Label, TextArea} from "@heroui/react";
import useNewsCreatingOrUpdatingView from "./useNewsCreatingOrUpdatingView";
import {IGeneralNewsById} from "@/src/interfaces/news/IGeneralNewsById";
import MyImage from "@/src/components/shared/components/image/MyImage";

type Props = { mode?: 'create' | 'update', news?: IGeneralNewsById, foodAndDrinkId?: string}

const NewsCreatingOrUpdatingView: FC<Props> = ({mode = 'create', news, foodAndDrinkId}) => {
    const {register, handleSubmit, errors, isValid, isLoading, photoPreview, handleCreateFormSubmit, handleUpdateFormSubmit, handlePhotoClear, handlePhotoSelect, isDirty} = useNewsCreatingOrUpdatingView({mode, news, foodAndDrinkId})

    const submitLabel = mode === 'create' ? 'Створити' : 'Оновити'

    return (
        <Form onSubmit={handleSubmit(mode === 'create' ? handleCreateFormSubmit : handleUpdateFormSubmit)} className="flex flex-col gap-6 w-[30vw]">
            <h1 className="font-bold text-2xl">{mode === 'create' ? 'Створити новину' : 'Оновити новину'}</h1>

            <div className="flex flex-col gap-2">
                <Label isRequired className="font-bold">Фото</Label>
                        <div className="w-full h-48 border-2 border-dashed rounded-[40px] flex items-center justify-center overflow-hidden relative">
                            {photoPreview ? (
                                <>
                                    <MyImage photoPreview={photoPreview}/>
                                    <div className="absolute top-2 right-2">
                                        <Button type="button" onClick={() => handlePhotoClear()} className="!px-2 !py-1">Видалити</Button>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500">
                                    <span>Натисніть або перетягніть фото</span>
                                    <input type="file" accept="image/jpeg,image/jpg,image/png" className="hidden" onChange={(e) => handlePhotoSelect(e.target.files)} />
                                </label>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-gray-600">Одна фотографія. Формати: jpg, jpeg, png. Максимум 1 МБ.</div>
                        </div>
            </div>

            <div className="flex flex-col gap-2 relative w-full">
                <Label isRequired htmlFor="title" className="font-bold">Заголовок</Label>
                <Input id="title" placeholder={'Введіть заголовок...'} type="text" required {...register('title')} />
                {errors.title && <div className="absolute text-red-600 text-[12px] bottom-[-20px] leading-none">{errors.title.message}</div>}
            </div>


            <div className="flex flex-col gap-2 relative w-full">
                <Label isRequired htmlFor="text" className="font-bold">Текст</Label>
                <TextArea id={'text'} placeholder={'Введіть текст новини...'} className="h-[10rem] resize-none" maxLength={500} required {...register('text')} />
                <div className="text-sm absolute bottom-[-25px] right-0 text-gray-500">Макс 500 символів</div>
                {errors.text && <div className="absolute text-red-600 text-[12px] bottom-[-20px] leading-none">{errors.text.message}</div>}
            </div>


            <div className="relative mb-2">
                <Button type={'submit'} className={'mt-4'} isDisabled={!isValid || isLoading || !photoPreview || !isDirty}>{submitLabel}</Button>
            </div>
        </Form>
    )
}

export default NewsCreatingOrUpdatingView