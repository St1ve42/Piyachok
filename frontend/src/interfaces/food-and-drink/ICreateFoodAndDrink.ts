import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";

export interface ICoordinates{
    lat: number;
    lng: number;
}

export interface IBusinessHours {
    day: string;
    open: string;
    close: string;
}

export interface ILocation {
    street: string;
    coordinates?: ICoordinates
}

export interface ICreateFoodAndDrink {
    name: string;
    description: string;
    type: FoodAndDrinkTypeEnum;
    features?: string[]
    cityId: number;
    street: string;
    phone: string;
    averageReceipt: number;
    email: string
    site?: string;
    instagram?: string;
    tags?: string[];
    businessHours: IBusinessHours[];
    facebook?: string;
    x?: string;
    telegram?: string;
}

export interface ICreateFoodAndDrinkDto extends Omit<ICreateFoodAndDrink, 'street' | 'instagram' | 'facebook' | 'x' | 'telegram'>{
    location: ILocation
    socialNetworks: Pick<ICreateFoodAndDrink, 'instagram' | 'facebook' | 'x' | 'telegram'>
}

