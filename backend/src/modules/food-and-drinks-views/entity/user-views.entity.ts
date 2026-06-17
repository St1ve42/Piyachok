import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';
import { User } from '../../users/entities/user.entity';

@Unique(['userId', 'foodAndDrinkId'])
@Entity()
export class UserView {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    foodAndDrinkId: string;

    @ManyToOne(() => User, (user) => user.userViews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.userViews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;

    @CreateDateColumn()
    viewedAt: Date;
}
