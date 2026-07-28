import {
    Column,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';

@Entity()
export class FoodAndDrinkTopCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    @Index()
    name: string;
    @ManyToMany(
        () => FoodAndDrink,
        (foodAndDrink) => foodAndDrink.topCategories,
        { nullable: true },
    )
    foodAndDrinks: FoodAndDrink[] | null;
}
