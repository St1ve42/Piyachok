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
import { Tag } from '../../tags/entity/tag.entity';
import { FoodAndDrinkStatistic } from '../../food-and-drink-statistics/entities/food-and-drink-statistic.entity';
import { FoodAndDrinkViewsPerDay } from '../../food-and-drinks-views/entity/food-and-drink-views-per-day.entity';
import { UserView } from '../../food-and-drinks-views/entity/user-views.entity';
import { City } from '../../cities/entities/city.entity';
import { FoodAndDrinkDaysEnum } from '../enums/food-and-drink-days.enum';
import { FoodAndDrinkFeaturesEnum } from '../enums/food-and-drink-features.enum';
import { Review } from '../../reviews/entities/review.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { News } from '../../news/entities/news.entity';
import { FoodAndDrinkTopCategory } from '../../food-and-drink-top-category/entities/food-and-drink-top-category.entity';
import { Piyachok } from '../../piyachok/entities/piyachok.entity';

@Index(['name'])
@Index(['averageReceipt'])
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

    @Column('json')
    location: {
        street: string;
        coordinates?: { lat: number; lng: number };
    };

    @Column({ unique: true })
    email: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column()
    cityId: number;

    @ManyToOne(() => City, (city) => city.foodAndDrinks, { eager: true })
    @JoinColumn({ name: 'cityId' })
    city: City;

    @Column('json')
    businessHours: Array<{
        day: FoodAndDrinkDaysEnum;
        open: string;
        close: string;
    }>;

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
    isTop: boolean;

    @Column('float', { nullable: true })
    customRating: number | null;

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

    @Column({ type: 'json', nullable: true })
    features?: FoodAndDrinkFeaturesEnum[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    ownerId: string;

    @OneToOne(() => User, (user) => user.ownerOf)
    @JoinColumn({ name: 'ownerId' })
    owner: User;

    @OneToMany(() => User, (user) => user.managerOf, { nullable: true })
    managers?: User[] | null;

    @ManyToMany(() => Tag, (tag) => tag.foodAndDrinks, {
        cascade: ['insert', 'update'],
        nullable: true,
        eager: true,
    })
    @JoinTable()
    tags?: Tag[] | null;

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

    @OneToMany(() => Review, (review) => review.foodAndDrink, {
        nullable: true,
    })
    reviews: Review[] | null;

    @OneToMany(() => Comment, (comment) => comment.foodAndDrink, {
        nullable: true,
    })
    comments: Comment[] | null;

    @OneToMany(() => News, (news) => news.foodAndDrink, {
        nullable: true,
    })
    news: News[] | null;

    @ManyToMany(
        () => FoodAndDrinkTopCategory,
        (foodAndDrinkTopCategories) => foodAndDrinkTopCategories.foodAndDrinks,
        { nullable: true, cascade: ['insert', 'update', 'remove'] },
    )
    @JoinTable()
    topCategories: FoodAndDrinkTopCategory[] | null;

    @OneToMany(() => Piyachok, (piyachok) => piyachok.foodAndDrink, {
        nullable: true,
    })
    piyachoks: Piyachok[] | null;

    distance?: string;
}
