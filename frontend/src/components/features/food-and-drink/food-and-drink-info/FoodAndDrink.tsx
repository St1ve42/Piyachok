'use client'
import {Avatar, Button, Card, CardContent, Chip, Dropdown, Header, Heading, Input, Label, Modal} from "@heroui/react";
import Image from "next/image";
import {EllipsisVertical, Eye, Globe, MapPin, Pencil, Route, TrashBin, Smartphone} from "@gravity-ui/icons";
import useFoodAndDrink from './useFoodAndDrink'
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Link from "next/link";
import {IFoodAndDrinkOwnerInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo";
import {FC} from "react";
import noImage from "@/src/public/no-image-icon.jpg";
import {v4 as uuidv4} from "uuid";
import {utils} from "@/src/services/utils.service";
import {IFoodAndDrinkSuperadminInfo} from "@/src/interfaces/food-and-drink/IFoodAndDrinkSuperadminInfo";
import UserAvatar from "@/src/public/default_user_avatar.png";
import {IUser} from "@/src/interfaces/users/IUser";
import UsersSearch from "@/src/components/features/users/search/UsersSearch";
import {UserSearchByEnum} from "@/src/enums/user/user.search.by";
import {IFoodAndDrinkById} from "@/src/interfaces/food-and-drink/IFoodAndDrinkById";
import TotalStatistics from "@/src/components/features/food-and-drink/TotalStatistics";
import Statistics from "@/src/components/views/account/Statistics";
import {useSearchParams} from "next/navigation";
import {FoodAndDrinkDaysEnum} from "@/src/enums/food-and-drink/food-and-drink-days.enum";

type PropsType = {
    foodAndDrink: IFoodAndDrinkById;
    mode: 'user'
} | {mode: 'owner', foodAndDrink: IFoodAndDrinkOwnerInfo} | {mode: 'superadmin', foodAndDrink: IFoodAndDrinkSuperadminInfo, users: IUser[]}

const FoodAndDrink: FC<PropsType> = (props) => {
    const searchParams = useSearchParams()
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const {icons, handleConfirm, handleOnPressDeleteButton, isCorrectInput, handleConfirmInputChange, handleChangeStatus, handleBindOwnership, errorMessage, closeTriggerButtonRef} = useFoodAndDrink({foodAndDrink: props.foodAndDrink})
    const {images, name, type, location, city, features, site, phone, averageReceipt, description, tags, businessHours, socialNetworks, id} = props.foodAndDrink
    const offset = -(new Date().getTimezoneOffset())
    const createdAtDate = props.mode !== 'user' ? new Date(new Date(props.foodAndDrink.createdAt).getTime() + offset*60*1000) : null
    const updatedAtDate = props.mode !== 'user' ? new Date(new Date(props.foodAndDrink.updatedAt).getTime() + offset*60*1000) : null
    const dateOptions: {[key: string]: string} = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Europe/Kyiv",
    };
    return (
        <section className="flex flex-col gap-2">
            {props.mode !== 'user' && <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    {createdAtDate && <div>Створено: {createdAtDate.toLocaleDateString('uk-UA', dateOptions)}, {createdAtDate.toLocaleTimeString('uk-UA')}</div>}
                    {updatedAtDate && <div>Оновлено: {updatedAtDate.toLocaleDateString('uk-UA', dateOptions)}, {updatedAtDate.toLocaleTimeString('uk-UA')}</div>}
                </div>
                <div className="flex items-center gap-4">
                    {props.mode === 'superadmin' && <Dropdown>
                      <Button isIconOnly aria-label="Menu" variant="secondary">
                        <EllipsisVertical className="outline-none" />
                      </Button>
                      <Dropdown.Popover>
                        <Dropdown.Menu>
                          <Dropdown.Section>
                            <Header>Дії</Header>
                            <Dropdown.Item onClick={handleChangeStatus}>
                              <Label>{props.foodAndDrink.status === 'active' ? 'Деактивувати' : 'Активувати'}</Label>
                            </Dropdown.Item>
                          </Dropdown.Section>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>}
                    {props.mode === 'superadmin' && props.users &&
                        <Modal>
                            <Button className="bg-orange-400"><Route/>Прив`язка</Button>
                            <Modal.Backdrop>
                                <Modal.Container>
                                    <Modal.Dialog className="sm:max-w-[450px] h-[60vh]">
                                        <Modal.CloseTrigger ref={closeTriggerButtonRef}/>
                                        <Modal.Header>
                                            <Modal.Heading>Виберіть користувача, якого хочете прив&#39;язати до вибраного закладу, або знайдіть його, скориставшись пошуком за імейлом</Modal.Heading>
                                        </Modal.Header>
                                        <Modal.Body className="flex gap-3 flex-col">
                                            <div className="ml-1">
                                                <UsersSearch searchBy={UserSearchByEnum.EMAIL} isDropdown={false}/>
                                            </div>
                                            <div className="mb-3">
                                                {props.users.length !== 0 ? props.users.map(user => <Card key={user.id} className="text-[14px] h-fit mt-3">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-4">
                                                                <Avatar className={'size-14'}>
                                                                    <Avatar.Image alt="фото" src={user.photo ? utils.buildStorageURL(user.photo ) : UserAvatar.src} width={100} height={100}/>
                                                                </Avatar>
                                                                <div>
                                                                    <div>{user.name} {user.surname}</div>
                                                                    <div>{user.email}</div>
                                                                </div>
                                                            </div>
                                                            <Button className="bg-orange-400" onClick={handleBindOwnership(user.id)}><Route/></Button>
                                                        </div>
                                                </Card>) : <div className="mt-2 italic">Користувачів не знайдено</div>}
                                            </div>
                                        </Modal.Body>
                                    </Modal.Dialog>
                                </Modal.Container>
                            </Modal.Backdrop>
                        </Modal>
                    }
                    <Link href={`/account/superadmin/food-and-drinks/${id}/update`}>
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
            {props.mode === 'superadmin' && <Card className="text-[14px] h-fit w-[20vw] self-end flex-row items-center">
                <Avatar className={'size-14'}>
                    <Avatar.Image alt="фото" src={props.foodAndDrink.owner.photo ? utils.buildStorageURL(props.foodAndDrink.owner.photo ) : UserAvatar.src} width={100} height={100}/>
                </Avatar>
                <CardContent>
                    <div>{props.foodAndDrink.owner.name} {props.foodAndDrink.owner.surname}</div>
                    <div>{props.foodAndDrink.owner.email}</div>
                </CardContent>
                <Link href={`/account/superadmin/users/${props.foodAndDrink.owner.id}`}>
                    <Eye/>
                </Link>
            </Card>}
            {errorMessage && <div className="absolute text-red-600 w-[56%] text-[10px] mt-14 leading-none">{errorMessage}</div>}
            <div className="flex gap-4 mt-2">
                <div className="flex flex-col gap-4 flex-1" style={{width: props.mode === 'user' ? '68%' : '100%'}}>
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
                    </div> : <Image src={noImage} alt={'Зображення відсутнє'} width={150} height={150} priority={true} className="w-full h-[25rem] rounded-sm border-black border-solid border-2"/>}
                    <div className="bg-white p-4 rounded-md shadow-sm flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">{name}</h1>
                                <div className="text-sm text-gray-500">{type}</div>
                            </div>
                            {props.mode === 'user' && <TotalStatistics foodAndDrinkId={id} isFavourite={props.foodAndDrink.isFavourite}/>}
                            {props.mode !== 'user' && <div className="flex items-center gap-2">
                                <Chip color="success">Статус: {props.foodAndDrink.status}</Chip>
                            </div>}
                        </div>

                        <p className="text-gray-700">{description}</p>
                       <h3><span className="font-semibold">Середній чек:</span> {averageReceipt} грн</h3>
                        <div className="gap-2 grid grid-cols-2">
                            <div>
                                <h3 className="font-semibold">Контакти</h3>
                                <div className="flex items-center gap-2"><Smartphone/>{phone}</div>
                                <div className="flex items-center gap-2 mt-1"><MapPin/> {location.street}, {city}</div>
                                {site && <div className="flex items-center gap-2 w-full min-w-0">
                                    <Globe className="shrink-0" />
                                    <Link
                                        href={site}
                                        target={'_blank'}
                                        className="text-blue-600 block truncate w-full"
                                    >
                                        {site}
                                    </Link>
                                </div>}
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Години роботи</h3>
                                <ul className="text-sm text-gray-700 grid grid-rows-4 grid-flow-col gap-x-4">
                                    {Object.values(FoodAndDrinkDaysEnum).map(day => {
                                        const foundedBusinessHour = businessHours.find(businessHour => businessHour.day === day)
                                        if(!foundedBusinessHour){
                                            return <li key={uuidv4()} className="flex justify-between mr-5"><span>{day}</span><span>не вказано</span></li>
                                        }
                                        else{
                                            const {open, close} = foundedBusinessHour
                                            return <li key={uuidv4()} className="flex justify-between"><span>{day}</span><span>{open} - {close}</span></li>
                                        }
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Особливості</h3>
                                {features ? <div className="flex gap-2 flex-wrap">
                                    {features.map((f) => (
                                        <Chip key={f} className="uppercase">{f}</Chip>
                                    ))}
                                </div> : <div className="text-sm">Відсутні</div>}
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Теги</h3>
                                {tags ? <div className="flex gap-2 flex-wrap">
                                    {tags.map((tag) => <Link href={{pathname: '/', query: {tag}}} key={uuidv4()}><Chip className="hover:text-blue-600">{tag}</Chip></Link>)}
                                </div> : <div className="text-sm">Відсутні</div>}
                            </div>
                            <div className="w-[50%]">
                                <h3 className="font-semibold mb-2">Соціальні мережі</h3>
                                {socialNetworks && Object.keys(socialNetworks).length !==0 ? <ul className="text-sm text-gray-700">
                                    {Object.entries(socialNetworks).map(([key, value]) => (
                                        <li key={key} className="flex gap-2 mt-1">
                                            <Image src={icons[key]} alt={key} width={20} height={20}/>
                                            <span>{key}</span>
                                            <Link href={value}>{value}</Link>
                                        </li>
                                    ))}
                                </ul> : <div className="text-sm">Відсутні</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {props.mode === 'superadmin' && <div>
                <Heading level={3} className="text-center">Статистика</Heading>
                <Statistics start={start} end={end} id={id}/>
            </div>}
        </section>
    )
}

export default FoodAndDrink