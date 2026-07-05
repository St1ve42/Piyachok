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

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    text: string;
    @Column()
    @Index()
    foodAndDrinkId: string;
    @Column()
    @Index()
    userId: string;
    @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
