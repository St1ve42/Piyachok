import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';

@Unique(['foodAndDrinkId', 'viewDate'])
@Entity()
export class FoodAndDrinkViewsPerDay {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: 0 })
    viewsPerDay: number;
    @CreateDateColumn()
    viewDate: Date;

    @Column()
    foodAndDrinkId: string;

    @ManyToOne(
        () => FoodAndDrink,
        (foodAndDrink) => foodAndDrink.foodAndDrinkViewsPerDays,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
}
