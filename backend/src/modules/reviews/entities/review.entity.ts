import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';
import { User } from '../../users/entities/user.entity';

@Index(['foodAndDrinkId', 'rating'])
@Index(['userId', 'foodAndDrinkId'], { unique: true })
@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    rating: number;
    @Column('text')
    text: string;
    @Column()
    averageReceipt: number;
    @Column()
    foodAndDrinkId: string;
    @Column()
    userId: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.reviews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
    @ManyToOne(() => User, (user) => user.reviews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;
}
