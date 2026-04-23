import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { FoodAndDrink } from './food-and-drink.entity';

@Unique(['name'])
@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.tags, {
        nullable: true,
    })
    foodAndDrinks?: FoodAndDrink[] | null;
}
