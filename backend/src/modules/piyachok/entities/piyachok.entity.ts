import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { GenderEnum } from '../../users/enums/gender.enum';
import { PaymentTypeEnum } from '../enums/payment-type.enum';
import { PiyachokStatusEnum } from '../enums/piyachok-status.enum';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';
import { User } from '../../users/entities/user.entity';
import { PiyachokReply } from '../../piyachok-replies/entities/piyachok-reply.entity';

@Entity()
export class Piyachok {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('date')
    meetDate: Date;
    @Column('time')
    meetTime: string;
    @Column('text')
    purpose: string;
    @Column('enum', { enum: GenderEnum })
    targetGender: GenderEnum;
    @Column('int')
    peopleCount: number;
    @Column('enum', { enum: PaymentTypeEnum })
    paymentType: PaymentTypeEnum;
    @Column()
    budget: number;
    @Column('enum', {
        enum: PiyachokStatusEnum,
        default: PiyachokStatusEnum.ACTIVE,
    })
    status: PiyachokStatusEnum;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column()
    foodAndDrinkId: string;
    @Column()
    creatorId: string;
    @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.piyachoks, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'foodAndDrinkId' })
    foodAndDrink: FoodAndDrink;
    @ManyToOne(() => User, (user) => user.piyachoks, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'creatorId' })
    creator: User;
    @OneToMany(() => PiyachokReply, (piyachokReply) => piyachokReply.piyachok)
    piyachokReplies: PiyachokReply[];
}
