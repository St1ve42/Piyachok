import { FoodAndDrink } from '../entities/food-and-drink.entity';

export class ResponseFindActiveFoodAndDrinkByIdDto extends FoodAndDrink {
    isFavourite: boolean | null;
    isOwner: boolean | null;
}
