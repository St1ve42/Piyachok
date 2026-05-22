'use client'
import {Button, Chip} from "@heroui/react";
import Image from 'next/image'
import {MapPin, Globe, Pencil} from '@gravity-ui/icons'
import useFoodAndDrink from './useFoodAndDrink'
import {utils} from "@/src/utils/utils";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import Link from "next/link";

const FoodAndDrink = () => {
    const {data, isEditing, handleEdit, fileInputRef, handleTriggerFileInput, handleUploadFile, galleryFiles, handleRemoveGallery, handleSave, icons} = useFoodAndDrink()
    if (!data) return <div>Завантаження...</div>
    if(!data.success) return <div>Не вдалось завантажити Ваш заклад. Причина: {data.data.message}</div>
    const {images, name, type, location, city, features, site, phone, averageReceipt, description, rating, tags, status, businessHours, socialNetworks, updatedAt, createdAt} = data.data
    const date = new Date(createdAt)
    const options: {[key: string]: string} = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>Створено: {date.toLocaleDateString('uk-UA', options)}, {date.toLocaleTimeString('uk-UA')}</div>
                {isEditing ? (
                    <Button className="self-end" onClick={handleSave}>Зберегти</Button>
                ) : (
                    <Button className="self-end" onClick={handleEdit}><Pencil/>Редагувати</Button>
                )}
            </div>
            <div className="flex justify-between gap-6">
                <div className="col-span-2 w-[70%]">
                    <div className="relative rounded-md overflow-hidden">
                        <Swiper className="relative w-full h-[360px] bg-gray-100"
                            modules={[Navigation]}
                            spaceBetween={50}
                            navigation={true}
                            loop={true}
                            slidesPerView={1}
                        >
                            {images ? images.map((image => <SwiperSlide key={image}><Image src={utils.buildStorageURL(image)} alt={name} fill className="object-cover" /></SwiperSlide>)) : <div className="w-full h-full flex items-center justify-center text-gray-500">Немає фото</div>}
                        </Swiper>
                        <button onClick={handleEdit} className="absolute top-3 right-3 bg-white rounded-md p-2 shadow">
                            <Pencil/>
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {/*<div className="col-span-1">*/}
                        {/*    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadFile} />*/}
                        {/*    <div onClick={handleTriggerFileInput} className="h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer">Додати фото</div>*/}
                        {/*</div>*/}
                        {galleryFiles.map((file, idx) => (
                            <div key={idx} className="h-20 rounded-md overflow-hidden relative">
                                {/* preview: use native img for blob URL */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                                <button onClick={() => handleRemoveGallery(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1">✕</button>
                            </div>
                        ))}
                    </div>
                </div>
                <aside className="col-span-1">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <h4 className="font-semibold mb-2">Інформація</h4>
                        <div className="mb-2">Рейтинг: {rating ?? '—'}</div>
                        <div className="mb-2">Середній чек: {averageReceipt} грн</div>
                        <div className="mb-2">Телефон: {phone}</div>
                    </div>
                </aside>
            </div>
        <div className="bg-white p-4 rounded-md shadow-sm w-full mb-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <div className="text-sm text-gray-500">{type}</div>
                </div>
                <div className="flex items-center gap-2">
                    <Chip color="success">Статус: {status}</Chip>
                </div>
            </div>

            <p className="mt-4 text-gray-700">{description}</p>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2">Контакти</h3>
                    <div className="flex items-center gap-2">{phone}</div>
                    {site && <div className="flex items-center gap-2 mt-1"><Globe/> <a href={site} target="_blank" rel="noreferrer" className="text-blue-600">{site}</a></div>}
                    <div className="flex items-center gap-2 mt-1"><MapPin/> {location.street}, {city}</div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Особливості</h3>
                    <div className="flex gap-2 flex-wrap">
                        {features.map((f) => (
                            <Chip key={f} className="uppercase">{f}</Chip>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="mt-6 w-[60%]">
                    <h3 className="font-semibold mb-2">Години роботи</h3>
                    <ul className="text-sm text-gray-700">
                        {businessHours.map((bh, i) => (
                            <li key={i} className="flex justify-between"><span>{bh.day}</span><span>{bh.open} - {bh.close}</span></li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Теги</h3>
                    <div className="flex gap-2 flex-wrap">
                        {tags ? tags.map((t, i) => <Chip key={i}>{t}</Chip>) : <div className="text-sm">Відсутні</div>}
                    </div>
                </div>
            </div>
            <div className="mt-6 w-[40%]">
                <h3 className="font-semibold mb-2">Соціальні мережі</h3>
                <ul className="text-sm text-gray-700">
                    {socialNetworks && Object.entries(socialNetworks).map(([key, value]) => (
                        <li key={key} className="flex gap-2 mt-1">
                            <Image src={icons[key]} alt={key} width={20} height={20}/>
                            <span>{key}</span>
                            <Link href={value}>{value}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </section>
    )
}

export default FoodAndDrink