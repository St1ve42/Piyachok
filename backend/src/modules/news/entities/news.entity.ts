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
import { NewsCategoryEnum } from '../enums/news-category.enum';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column('text')
    text: string;
    @Column('varchar', { nullable: true })
    photo: string | null;
    @Column('enum', {
        enum: NewsCategoryEnum,
        default: NewsCategoryEnum.GENERAL,
    })
    @Index()
    category: NewsCategoryEnum;
    @Column({ default: false })
    isPromoted: boolean;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column()
    foodAndDrinkId: string;
    @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.news, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
}
