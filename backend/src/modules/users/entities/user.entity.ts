import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProviderEnum } from '../../../shared/enums/provider.enum';
import { GenderEnum } from '../enums/gender.enum';
import { Region } from '../../regions/entities/region.entity';
import { City } from '../../cities/entities/city.entity';
import { Role } from '../../roles/entities/role.entity';
import { Token } from '../../tokens/entities/token.entity';
import { hash } from 'bcrypt';
import { FoodAndDrink } from '../../food-and-drink/entities/food-and-drink.entity';
import { UserView } from '../../food-and-drinks-views/entity/user-views.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    age: number;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    firebaseUid?: string;

    @Column({ type: 'json', nullable: true })
    providers: ProviderEnum[] = [ProviderEnum.LOCAL];

    @Column('varchar', { nullable: true })
    photo?: string | null;

    @Column('varchar', { nullable: true, unique: true })
    phone?: string | null;

    @Column({ type: 'enum', enum: GenderEnum, nullable: true })
    gender?: GenderEnum | null;

    @Column()
    roleId: number;

    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @Column()
    cityId: number;

    @ManyToOne(() => City, (city) => city.users, { eager: true })
    @JoinColumn({ name: 'cityId' })
    city: City;

    @Column()
    regionId: number;

    @ManyToOne(() => Region, (region) => region.users, { eager: true })
    @JoinColumn({ name: 'regionId' })
    region: Region;

    @OneToMany(() => Token, (token) => token.user, { nullable: true })
    tokens: Token[] | null;

    @OneToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.owner, {
        nullable: true,
    })
    ownerOf?: FoodAndDrink | null;

    @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.managers, {
        nullable: true,
    })
    managerOf?: FoodAndDrink | null;

    @OneToMany(() => UserView, (userView) => userView.user, {
        cascade: ['insert', 'update'],
        nullable: true,
    })
    userViews?: UserView[] | null;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const password = this.password;
        if (password) {
            this.password = await hash(password, 10);
        }
    }
}
