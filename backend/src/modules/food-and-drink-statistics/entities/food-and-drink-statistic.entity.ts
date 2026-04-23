import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';

@Entity()
export class FoodAndDrinkStatistic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    totalViews: number;

    @Column({ default: 0 })
    totalFavourites: number;

    @Column()
    foodAndDrinkId: string;

    @OneToOne(
        () => FoodAndDrink,
        (foodAndDrink) => foodAndDrink.foodAndDrinkStatistics,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
}
