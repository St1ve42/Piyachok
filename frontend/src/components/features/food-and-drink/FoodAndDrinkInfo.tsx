import Image from "next/image";
import {Chip} from "@heroui/react";
import {Globe, MapPin, Smartphone} from "@gravity-ui/icons";
import Link from "next/link";
import {FoodAndDrinkDaysEnum} from "@/src/enums/food-and-drink/food-and-drink-days.enum";
import {v4 as uuidv4} from "uuid";
import {IFoodAndDrink} from "@/src/interfaces/food-and-drink/IFoodAndDrink";
import {FC} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Facebook from "@/src/public/facebook_logo.svg";
import Telegram from "@/src/public/telegram.png";
import Instagram from "@/src/public/instagram.png";
import Twitter from "@/src/public/twitter.png";

type PropsType = {
    foodAndDrink: IFoodAndDrink
}

const FoodAndDrinkInfo: FC<PropsType> = ({foodAndDrink}) => {
    const {name, type, location, city, features, site, phone, averageReceipt, description, tags, businessHours, socialNetworks} = foodAndDrink
    const icons: {[key: string]: StaticImport} = {
        "facebook": Facebook,
        "telegram": Telegram,
        "instagram": Instagram,
        "X": Twitter
    }
    return (
        <div className="bg-white p-4 rounded-md shadow-sm flex flex-col gap-2">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <div className="text-sm text-gray-500">{type}</div>
                </div>
            </div>

            <p className="text-gray-700">{description}</p>
            <h3><span className="font-semibold">Середній чек:</span> {averageReceipt} грн</h3>
            <div className="lg:gap-2 lg:grid lg:grid-cols-2 flex flex-col gap-2">
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
                    <ul className="text-sm text-gray-700 lg:grid lg:grid-rows-4 lg:grid-flow-col lg:gap-x-4 flex flex-col gap-1">
                        {Object.values(FoodAndDrinkDaysEnum).map(day => {
                            const foundedBusinessHour = businessHours.find(businessHour => businessHour.day === day)
                            if(!foundedBusinessHour){
                                return <li key={uuidv4()} className="flex justify-between max-lg:w-[300px] max-sm:w-[250px] max-sm:mr-5"><span>{day}</span><span>не вказано</span></li>
                            }
                            else{
                                const {open, close} = foundedBusinessHour
                                return <li key={uuidv4()} className="flex justify-between max-lg:w-[300px] max-sm:w-[250px]"><span>{day}</span><span>{open} - {close}</span></li>
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
                <div className="w-full max-md:w-1/2">
                    <h3 className="font-semibold mb-2">Соціальні мережі</h3>
                    {socialNetworks && Object.keys(socialNetworks).length !==0 ? <ul className="text-sm text-gray-700">
                        {Object.entries(socialNetworks).map(([key, value]) => (
                            <li key={key} className="mt-1">
                                <div className="flex items-center gap-2">
                                    <Image src={icons[key]} alt={key} width={20} height={20}/>
                                    <span className="font-medium">{key}</span>
                                </div>
                                <Link href={value} className="text-blue-600 block break-words pl-7 max-w-full">
                                    {value}
                                </Link>
                            </li>
                        ))}
                    </ul> : <div className="text-sm">Відсутні</div>}
                </div>
            </div>
        </div>
    )
}

export default FoodAndDrinkInfo