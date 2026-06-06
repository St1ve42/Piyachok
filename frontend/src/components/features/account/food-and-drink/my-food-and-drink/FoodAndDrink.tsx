'use client'
import { Button, Chip, Input, Modal } from "@heroui/react";
import Image from 'next/image'
import {MapPin, Globe, Pencil, TrashBin} from '@gravity-ui/icons'
import useFoodAndDrink from './useFoodAndDrink'
import {utils} from "@/src/utils/utils";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Link from "next/link";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";
import {FC} from "react";
import noImage from "@/src/public/no-image-icon.jpg";

type PropsType = {
    foodAndDrink: IFoodAndDrinkOwnerInfo;
    isPublic: false
} | {
    foodAndDrink: IFoodAndDrink;
    isPublic: true
}
const FoodAndDrink: FC<PropsType> = (props) => {
    const {isEditing, handleEdit, fileInputRef, handleTriggerFileInput, handleUploadFile, galleryFiles, handleRemoveGallery, icons, handleConfirm, handleOnPressDeleteButton, isCorrectInput, handleConfirmInputChange} = useFoodAndDrink({id: props.foodAndDrink.id, name: props.foodAndDrink.name})
    const {images, name, type, location, city, features, site, phone, averageReceipt, description, rating, tags, businessHours, socialNetworks} = props.foodAndDrink
    const createdAtDate = !props.isPublic ? new Date(props.foodAndDrink.createdAt) : null
    const createdAtDateOptions: {[key: string]: string} = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return (
        <section className="flex flex-col gap-6">
            {!props.isPublic && <div className="flex items-center justify-between">
                {createdAtDate && <div>Створено: {createdAtDate.toLocaleDateString('uk-UA', createdAtDateOptions)}, {createdAtDate.toLocaleTimeString('uk-UA')}</div>}
                <div className="flex items-center gap-4">
                    <Link href={'/account/food-and-drink/update'}>
                      <Button className="self-end"><Pencil/>Редагувати</Button>
                    </Link>
                    <Modal>
                      <Button variant="danger" onPress={handleOnPressDeleteButton}><TrashBin/>Видалити</Button>
                      <Modal.Backdrop>
                        <Modal.Container>
                          <Modal.Dialog className="sm:max-w-[450px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                              <Modal.Heading className="text-red-600">Видалити заклад?</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                              <div>
                                <p>Ви збираєтесь назавжди видалити заклад &#34;{name}&#34;.</p>
                                <p>Ви впевнені, що хочете видалити заклад? Це безповоротна дія, яка спричинить видалення закладу, включаючи усі пов`язані коментарі, відгуки і новини.:</p>
                              </div>
                              <div>Щоб підтвердити видалення, введіть <span className="font-bold">{name}</span> у поле нижче:</div>
                              <Input className="my-3 ml-1 w-[90%]" type='email' placeholder='Введіть ім`я закладу для підтвердження' onChange={handleConfirmInputChange}/>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button onClick={handleConfirm} isDisabled={!isCorrectInput} variant="danger" className="w-full" slot="close">
                                Видалити
                              </Button>
                              <Button className="w-full" slot="close">
                                Скасувати
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>
                </div>
            </div>}
            <div className="flex justify-between">
                <div className="col-span-2 w-[70%]">
                    {images ? <div className="relative rounded-md overflow-hidden">
                        <Swiper className="relative w-full h-[25rem] bg-gray-100"
                                modules={[Navigation, Pagination]}
                                spaceBetween={50}
                                navigation={true}
                                pagination={true}
                                loop={true}
                                slidesPerView={1}
                        >
                            {images.map((image => <SwiperSlide key={image}><Image src={utils.buildStorageURL(image)} alt={name} fill className="object-cover"/></SwiperSlide>))}
                        </Swiper>
                        {!props.isPublic && <button onClick={handleEdit} className="absolute top-3 right-3 bg-white rounded-md p-2 shadow">
                            <Pencil/>
                        </button>}
                    </div> : <Image src={noImage} alt={'Зображення відсутнє'} width={150} height={150} priority={true} className="w-full h-auto rounded-sm border-black border-solid border-2"/>}

                    {!props.isPublic && (isEditing && <div className="mt-4 grid grid-cols-4 gap-3">
                        <div className="col-span-1">
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadFile} />
                            <div onClick={handleTriggerFileInput} className="h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer">Додати фото</div>
                        </div>
                        {galleryFiles.map((file, idx) => (
                            <div key={idx} className="h-20 rounded-md overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover"/>
                                <button onClick={() => handleRemoveGallery(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1">✕</button>
                            </div>
                        ))}
                    </div>)}
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
                {!props.isPublic && <div className="flex items-center gap-2">
                    <Chip color="success">Статус: {props.foodAndDrink.status}</Chip>
                </div>}
            </div>

            <p className="mt-4 text-gray-700">{description}</p>

            <div className="mt-4 gap-4 grid grid-cols-2 items-center">
                <div>
                    <h3 className="font-semibold">Контакти</h3>
                    <div className="flex items-center gap-2">{phone}</div>
                    {site && <div className="flex items-center gap-2 mt-1"><Globe/> <a href={site} target="_blank" rel="noreferrer" className="text-blue-600">{site}</a></div>}
                    <div className="flex items-center gap-2 mt-1"><MapPin/> {location.street}, {city}</div>
                </div>
                <div className="w-[60%]">
                    <h3 className="font-semibold mb-2">Години роботи</h3>
                    <ul className="text-sm text-gray-700">
                        {businessHours.map((bh, i) => (
                            <li key={i} className="flex justify-between"><span>{bh.day}</span><span>{bh.open} - {bh.close}</span></li>
                        ))}
                    </ul>
                </div>
                {features && <div>
                    <h3 className="font-semibold mb-2">Особливості</h3>
                    <div className="flex gap-2 flex-wrap">
                        {features.map((f) => (
                            <Chip key={f} className="uppercase">{f}</Chip>
                        ))}
                    </div>
                </div>}
                {tags && <div>
                    <h3 className="font-semibold mb-2">Теги</h3>
                    <div className="flex gap-2 flex-wrap">
                        {tags.map((t, i) => <Chip key={i}>{t}</Chip>)}
                    </div>
                </div>}
                {socialNetworks && Object.keys(socialNetworks).length !==0 && <div className="w-[40%]">
                    <h3 className="font-semibold mb-2">Соціальні мережі</h3>
                    <ul className="text-sm text-gray-700">
                        {Object.entries(socialNetworks).map(([key, value]) => (
                            <li key={key} className="flex gap-2 mt-1">
                                <Image src={icons[key]} alt={key} width={20} height={20}/>
                                <span>{key}</span>
                                <Link href={value}>{value}</Link>
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>
        </div>
        </section>
    )
}

export default FoodAndDrink