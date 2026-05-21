'use client'
import {IUser} from "@/src/interfaces/users/IUser";
import {FC} from "react"
import {Avatar, Button, Input, Label, ListBox, Select, Form, ComboBox, Chip, Collection} from "@heroui/react";
import {Pencil, TrashBin} from "@gravity-ui/icons";
import Verified from "@/src/public/verified.png"
import UserAvatar from "@/src/public/default_user_avatar.png";
import {utils} from "@/src/utils/utils";
import Image from "next/image";
import useProfile from "@/src/components/features/account/profile/useProfile";

type PropsType = {
    user: IUser
}

const Profile: FC<PropsType> = ({user}) => {
    const {name, surname, age, photo, email, gender, phone, role, isVerified} = user
    const {handleUploadFile, handleTriggerFileInput, handleDeletePhoto, onSubmit, regionData, cityData, handleEdit, handleGenderSelectionChange, handleRegionInputChange, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, register, handleSubmit, errors, isValid, updateResponseMessage, uploadPhotoResponseMessage, isOpenEdit, selectedGender, cityInputValue, regionInputValue, fileInputRef} = useProfile({user})
    return (
        <section className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <Avatar className={'size-16'}>
                            <Avatar.Image alt="фото" src={photo ?? UserAvatar.src}/>
                        </Avatar>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadFile}/>
                        <TrashBin className={'absolute top-0 right-[-13px] cursor-pointer'} onClick={handleDeletePhoto}/>
                        <Pencil className={'absolute bottom-0 right-[-13px] cursor-pointer'} onClick={handleTriggerFileInput}/>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex gap-2 items-center">
                            <div className="font-bold">{name} {surname}</div>
                            <Chip color="warning" variant="primary" className="font-bold">{utils.capitalizeFirstLetter(role)}</Chip>
                            {isVerified && <Image src={Verified} alt={'Верифікація'} width={30} height={30} priority={true}/>}
                        </div>
                        <div>{email}</div>
                    </div>
                </div>
                <Button onClick={handleEdit}>{isOpenEdit ? 'Скасувати' : 'Редагувати'}</Button>
            </div>
             <div className="h-4 text-sm">{uploadPhotoResponseMessage}</div>
            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="name">Ім&#39;я</Label>
                        <Input id="name" placeholder={'Введіть ім\'я'} type="text" disabled={!isOpenEdit} defaultValue={name} {...register('name')}/>
                        {errors.name && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.name.message}</div>}
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="surname">Прізвище</Label>
                        <Input id="surname" placeholder={'Введіть прізвище'} type="text" disabled={!isOpenEdit} defaultValue={surname} {...register('surname')}/>
                        {errors.surname && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none mt-1 top-[-1px]">{errors.surname.message}</div>}
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="age">Вік</Label>
                        <Input id="age" placeholder={'Введіть вік'} type="number" disabled={!isOpenEdit} defaultValue={age} min={0} max={100} {...register('age', { valueAsNumber: true })}/>
                        {errors.age && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none mt-1">{errors.age.message}</div>}
                    </div>
                    <Select value={selectedGender} className="flex flex-col gap-1" placeholder={'Не вказано'} defaultValue={gender ?? 'reset'} isDisabled={!isOpenEdit} onSelectionChange={handleGenderSelectionChange}>
                        <Label htmlFor="gender">Стать</Label>
                        <Select.Trigger>
                            <Select.Value/>
                            <Select.Indicator/>
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id={'reset'} textValue={'Не вказано'}>
                                    Не вказано
                                </ListBox.Item>
                                <ListBox.Item id={'male'} textValue={'Чоловіча'}>
                                    Чоловіча
                                </ListBox.Item>
                                <ListBox.Item id={'female'} textValue={'Жіноча'}>
                                    Жіноча
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                    <ComboBox inputValue={regionInputValue} onInputChange={handleRegionInputChange} isDisabled={!isOpenEdit} onSelectionChange={handleRegionSelectionChange}>
                        <Label>Регіон</Label>
                        <ComboBox.InputGroup>
                            <Input placeholder={'Введіть регіон'}/>
                            <ComboBox.Trigger/>
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                <Collection items={regionData?.data}>
                                    {(region) =>
                                        <ListBox.Item id={region.id} textValue={region.name}>
                                            {region.name}
                                        </ListBox.Item>
                                    }
                                </Collection>
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                    <ComboBox inputValue={cityInputValue} onInputChange={handleCityInputChange} isDisabled={!isOpenEdit || !regionInputValue} onSelectionChange={handleCitySelectionChange}>
                        <Label>Місто</Label>
                        <ComboBox.InputGroup>
                            <Input placeholder={'Введіть місто'}/>
                            <ComboBox.Trigger/>
                        </ComboBox.InputGroup>
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
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder={'Введіть телефон'} type="text" disabled={!isOpenEdit} defaultValue={phone} {...register('phone')}/>
                        {errors.phone && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none mt-1">{errors.phone.message}</div>}
                    </div>
                </div>
                {isOpenEdit && <Button type={'submit'} isDisabled={!isValid}>Застосувати</Button>}
                {updateResponseMessage && <div>{updateResponseMessage}</div>}
            </Form>
        </section>
    )
}

export default Profile