import {FoodAndDrinkTypeEnum} from "@/src/enums/food-and-drink/food-and-drink-type.enum";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  street: string;
  coordinates: Coordinates;
}

export interface Features {
  isWifi: boolean;
  isParking: boolean;
  isLiveMusic: boolean;
  is24hrs: boolean;
}

export interface IFoodAndDrinkOneFromList {
  id: string;
  name: string;
  type: FoodAndDrinkTypeEnum;
  location: Location;
  city: string;
  mainImage: string | null;
  rating: number;
  distance: string | null;
  features: string[];
}