import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';

@Unique(['userId', 'foodAndDrinkId'])
@Entity()
export class Favourite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    foodAndDrinkId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => FoodAndDrink, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
}
