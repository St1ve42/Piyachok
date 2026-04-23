import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FoodAndDrink } from './food-and-drink.entity';

@Entity()
export class Features {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('boolean', { nullable: true })
    isWifi?: boolean | null;

    @Column('boolean', { nullable: true })
    isParking?: boolean | null;

    @Column('boolean', { nullable: true })
    isLiveMusic?: boolean | null;

    @Column('boolean', { nullable: true })
    is24hrs?: boolean | null;

    @Column()
    foodAndDrinkId: string;

    @OneToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.features, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
}
