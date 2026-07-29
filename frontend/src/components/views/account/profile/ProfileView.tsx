'use client'
import {IUser} from "@/src/interfaces/users/IUser";
import { FC } from 'react';
import {
    Avatar,
    Button,
    Input,
    Label,
    ListBox,
    Select,
    Form,
    Chip,
    Dropdown,
    Header,
    Modal
} from '@heroui/react';
import {Pencil, TrashBin, EllipsisVertical, Key} from "@gravity-ui/icons";
import Verified from "@/src/public/verified.png"
import UserAvatar from "@/src/public/default_user_avatar.png";
import Image from "next/image";
import useProfileView from "@/src/components/views/account/profile/useProfileView";
import {Controller} from "react-hook-form";
import RegionSelection from "@/src/components/shared/components/region/RegionSelection";
import CitySelection from "@/src/components/shared/components/city/CitySelection";
import ActiveUser from "@/src/public/active-user.png";
import { GlobalUserRoleEnum } from "@/src/enums/user/global.user.role.enum";
import Link from "next/link";
import { utilsService } from "@/src/services/utils.service";

type PropsType = {user: IUser, type: 'user', id?: string} | {user: IUser, type: 'superadmin', id: string}

const ProfileView: FC<PropsType> = ({user, type, id}) => {
    const {name, surname, photo, email, role, isVerified, region, city, isActive, isDeleted, ownerOf} = user
    const {handleUploadFile, handleTriggerFileInput, handleDeletePhoto, onSubmit, handleEdit, handleRegionSelectionChange, handleCityInputChange, handleCitySelectionChange, register, handleSubmit, errors, isValid, errorResponseMessage, uploadPhotoResponseMessage, isOpenEdit, cityInputValue, regionInputValue, fileInputRef, control, handleRegionInputChange, regionId, handleRegionIdMatch, handleActivation, handleVerification, handleDelete, handleConfirmInputChange, isCorrectInput, handleRestore, handleOnPressDeleteButton, isDirty, router} = useProfileView({user, type, id})
    return (
        <section className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <Avatar className={'size-16'}>
                            <Avatar.Image alt="фото" src={photo ? utilsService.buildStorageURL(photo) : UserAvatar.src}/>
                        </Avatar>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadFile}/>
                        <TrashBin className={'absolute top-0 right-[-15px] cursor-pointer'} onClick={handleDeletePhoto}/>
                        <Pencil className={'absolute bottom-0 right-[-15px] cursor-pointer'} onClick={handleTriggerFileInput}/>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex gap-2 items-center">
                            <div className="font-bold">{name} {surname}</div>
                            <Chip color="warning" variant="primary" className="font-bold">{utilsService.capitalizeFirstLetter(role)}</Chip>
                            {isActive && <Image src={ActiveUser} alt={'Активований'} width={30} height={30} priority={true}/>}
                            {isVerified && <Image src={Verified} alt={'Верифікація'} width={30} height={30} priority={true}/>}
                            {isDeleted && <TrashBin color={'red'} width={22} height={25}/>}
                        </div>
                        <div>{email}</div>
                    </div>
                </div>
                <div className="flex gap-6">
                    {type === 'superadmin' && <Dropdown>
                        <Button isIconOnly aria-label="Menu" variant="secondary">
                            <EllipsisVertical className="outline-none" />
                        </Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu>
                                <Dropdown.Section>
                                    <Header>Дії</Header>
                                    <Dropdown.Item onClick={handleActivation}>
                                        <Label>{isActive ? 'Деактивувати' : 'Активувати'}</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleVerification}>
                                        <Label>{isVerified ? 'Деверифікувати' : 'Верифікувати'}</Label>
                                    </Dropdown.Item>
                                    {role !== GlobalUserRoleEnum.USER && ownerOf && <Dropdown.Item>
                                        <Link href={`/account/superadmin/food-and-drinks/${ownerOf.id}`}>
                                            <Label>Подивитись заклад</Label>
                                        </Link>
                                    </Dropdown.Item>}
                                </Dropdown.Section>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>}
                  {role !== GlobalUserRoleEnum.SUPERADMIN && role !== GlobalUserRoleEnum.ADMIN && (!isDeleted ? <Modal>
                    <Button variant="danger" onPress={handleOnPressDeleteButton}><TrashBin/>Видалити</Button>
                    <Modal.Backdrop>
                      <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[450px]">
                          <Modal.CloseTrigger />
                          <Modal.Header>
                            <Modal.Heading className="text-red-600">Видалити акаунт?</Modal.Heading>
                          </Modal.Header>
                          <Modal.Body>
                              {type === 'superadmin'
                                ?
                                <div>
                                  <p>Ви збираєтесь назавжди деактивувати акаунт {name} {surname}.</p>
                                  <p className="font-bold">Наслідки дії:</p>
                                  <ul>
                                    <li>&#x2022; Користувач негайно втратить доступ до платформи.</li>
                                    <li>&#x2022; Контент: Відгуки та оцінки користувача залишаться для збереження статистики, але авторство буде змінено на «Видалений користувач».</li>
                                  </ul>
                                  <p className="font-bold">Дані користувача в базі дані будуть збережені.</p>
                                </div>
                                :
                                <p>Ви впевнені, що хочете назавжди видалити свій профіль? Цю дію неможливо скасувати</p>}
                            <div>Щоб підтвердити видалення, введіть <span className="font-bold">{email}</span> у поле нижче:</div>
                            <Input className="my-3 ml-1 w-[90%]" type='email' placeholder='Введіть email для підтвердження' onChange={handleConfirmInputChange}/>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleDelete} isDisabled={!isCorrectInput} variant="danger" className="w-full" slot="close">
                              Видалити
                            </Button>
                            <Button className="w-full" slot="close">
                              Скасувати
                            </Button>
                          </Modal.Footer>
                        </Modal.Dialog>
                      </Modal.Container>
                    </Modal.Backdrop>
                  </Modal> :
                    <Button className="bg-green-500" onClick={handleRestore}>Відновити акаунт</Button>
                  )}
                    {type === 'user' && <Button className="bg-orange-500" onPress={() => router.push('/account/change-password')}><Key/> Змінити пароль</Button>}
                    <Button onClick={handleEdit}>{isOpenEdit ? 'Скасувати' : <div className="flex items-center gap-2"><Pencil/> Редагувати</div>}</Button>
                </div>
            </div>
             <div className="h-4 text-sm">{uploadPhotoResponseMessage}</div>
            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="name">Ім&#39;я</Label>
                        <Input id="name" placeholder={'Введіть ім\'я'} type="text" disabled={!isOpenEdit} {...register('name')}/>
                        {errors.name && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none">{errors.name.message}</div>}
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="surname">Прізвище</Label>
                        <Input id="surname" placeholder={'Введіть прізвище'} type="text" disabled={!isOpenEdit} {...register('surname')}/>
                        {errors.surname && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none mt-1 top-[-1px]">{errors.surname.message}</div>}
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="age">Вік</Label>
                        <Input id="age" placeholder={'Введіть вік'} type="number" disabled={!isOpenEdit} min={0} max={100} {...register('age', { valueAsNumber: true })}/>
                        {errors.age && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none mt-1">{errors.age.message}</div>}
                    </div>
                    <Controller render={({field}) => (
                        <Select {...field} className="flex flex-col gap-1" placeholder={'Не вказано'} isDisabled={!isOpenEdit}>
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
                    )} name={'gender'} control={control}/>
                    <RegionSelection onRegionIdMatch={handleRegionIdMatch} isDisabled={!isOpenEdit} initialRegionInputValue={region} regionInputValue={regionInputValue} handleRegionInputChange={handleRegionInputChange} handleRegionChange={handleRegionSelectionChange}/>
                    <CitySelection isDisabled={!isOpenEdit} regionId={regionId} regionInputValue={regionInputValue} initialCityInputValue={city} cityInputValue={cityInputValue} handleCityInputChange={handleCityInputChange} handleCityChange={handleCitySelectionChange}/>
                    <div className="flex flex-col gap-1 relative">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder={'Введіть телефон'} type="text" disabled={!isOpenEdit} {...register('phone')}/>
                        {errors.phone && <div className="absolute text-red-600 text-[10px] bottom-[-20px] leading-none mt-1">{errors.phone.message}</div>}
                    </div>
                </div>
                {isOpenEdit && <Button type={'submit'} isDisabled={!isValid || !isDirty}>Застосувати</Button>}
                {errorResponseMessage && <div>{errorResponseMessage}</div>}
            </Form>
        </section>
    )
}

export default ProfileView