import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";
import {FoodAndDrinkFeaturesEnum} from "@/src/enums/food-and-drink/food-and-drink-features.enum";

export interface ILocation {
    street: string
    coordinates: {
        latitude: number;
        longitude: number;
    }
}

export interface IBusinessHours {
    day: string;
    open: string;
    close: string;
}


export interface IFoodAndDrink {
    id: string;
    name: string;
    description: string;
    type: FoodAndDrinkTypeEnum;
    location: ILocation;
    city: string;
    businessHours: Array<IBusinessHours>;
    images: string[] | null;
    mainImage: string | null;
    phone: string | null;
    averageReceipt: number;
    site: string | null;
    rating: number | null;
    socialNetworks?: {
        instagram?: string;
        telegram?: string;
        facebook?: string;
        X?: string;
    };
    features?: FoodAndDrinkFeaturesEnum[];
    tags: string[];
}