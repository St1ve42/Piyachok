import { FoodAndDrinkTypeEnum } from '../enums/food-and-drink-type.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { FoodAndDrinkStatusEnum } from '../enums/food-and-drink-status.enum';
import { User } from '../../users/entities/user.entity';
import { Tag } from './tag.entity';
import { Features } from './features.entity';
import { FoodAndDrinkStatistic } from '../../food-and-drink-statistics/entities/food-and-drink-statistic.entity';
import { FoodAndDrinkViewsPerDay } from '../../food-and-drink-statistics/entities/food-and-drink-views-per-day.entity';
import { UserView } from '../../food-and-drink-statistics/entities/user-views.entity';

@Index(['name', 'description'])
@Index(['averageReceipt'])
@Unique(['location'])
@Unique(['phone'])
@Entity()
export class FoodAndDrink {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('enum', { enum: FoodAndDrinkTypeEnum })
    type: FoodAndDrinkTypeEnum;

    @Column()
    location: string;

    @Column()
    businessHours: string;

    @Column('json', { nullable: true })
    images?: string[] | null;

    @Column('varchar', { nullable: true })
    mainImage?: string | null;

    @Column()
    phone: string;

    @Column()
    averageReceipt: number;

    @Column('enum', {
        enum: FoodAndDrinkStatusEnum,
        default: FoodAndDrinkStatusEnum.PENDING,
    })
    status: FoodAndDrinkStatusEnum;

    @Column({ default: false })
    isDeleted: boolean;

    @Column('varchar', { nullable: true })
    site?: string | null;

    @Column('float', { nullable: true })
    rating?: number | null;

    @Column('json', { nullable: true })
    socialNetworks?: {
        instagram?: string;
        telegram?: string;
        facebook?: string;
        X?: string;
    };

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    ownerId: string;

    @Column({ nullable: true })
    managerId?: string;

    @ManyToOne(() => User, (user) => user.ownerOf)
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @ManyToOne(() => User, (user) => user.managerOf, { nullable: true })
    @JoinColumn({ name: 'managerId' })
    managers?: User | null;

    @ManyToMany(() => Tag, (tag) => tag.foodAndDrinks, {
        cascade: ['insert', 'update'],
        nullable: true,
        eager: true,
    })
    @JoinTable()
    tags?: Tag[] | null;

    @OneToOne(() => Features, (features) => features.foodAndDrink, {
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE',
        nullable: true,
        eager: true,
    })
    features?: Features | null;

    @OneToOne(
        () => FoodAndDrinkStatistic,
        (foodAndDrinkStatistics) => foodAndDrinkStatistics.foodAndDrink,
        {
            cascade: ['insert', 'update'],
        },
    )
    foodAndDrinkStatistics: FoodAndDrinkStatistic;

    @OneToMany(
        () => FoodAndDrinkViewsPerDay,
        (foodAndDrinkViewsPerDay) => foodAndDrinkViewsPerDay.foodAndDrink,
        {
            cascade: ['insert', 'update'],
        },
    )
    foodAndDrinkViewsPerDays: FoodAndDrinkViewsPerDay[];

    @OneToMany(() => UserView, (userView) => userView.foodAndDrink, {
        cascade: ['insert', 'update'],
        nullable: true,
    })
    userViews: UserView[] | null;
}
