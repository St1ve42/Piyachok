import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
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
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({ example: 'e2fecad4-8ca7-4a76-8354-8331309df863' })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty({ example: 'Олександр' })
    @Column()
    name: string;
    @ApiProperty({ example: 'Петренко' })
    @Column()
    surname: string;
    @ApiProperty({ example: 30 })
    @Column()
    age: number;
    @ApiProperty({ example: 'oleksandr.petrenko@example.com' })
    @Column({ unique: true, nullable: true })
    email?: string;
    @Column({ nullable: true })
    @Exclude()
    password?: string;
    @Column({ nullable: true })
    @Exclude()
    firebaseUid?: string;
    @ApiProperty({ example: 'local' })
    @Column({ type: 'json', nullable: true })
    providers: ProviderEnum[] = [ProviderEnum.LOCAL];
    @ApiProperty({ example: null })
    @Column({ nullable: true })
    photo?: string;
    @ApiProperty({ example: '+380501234567' })
    @Column({ nullable: true, unique: true })
    phone?: string;
    @ApiProperty({ example: 'male' })
    @Column({ type: 'enum', enum: GenderEnum, nullable: true })
    gender: GenderEnum;

    @Column()
    @Exclude()
    roleId: number;
    @ApiProperty({ example: 'user' })
    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'roleId' })
    @Transform(({ value }) => (value as Role)?.name)
    role: Role;
    @Column()
    @Exclude()
    cityId: number;
    @ApiProperty({ example: 'Вінниці' })
    @ManyToOne(() => City, (city) => city.users, { eager: true })
    @JoinColumn({ name: 'cityId' })
    @Transform(({ value }) => (value as City)?.name)
    city: City;
    @Column()
    @Exclude()
    regionId: number;
    @ApiProperty({ example: 'Вінницька область' })
    @ManyToOne(() => Region, (region) => region.users, { eager: true })
    @JoinColumn({ name: 'regionId' })
    @Transform(({ value }) => (value as Region)?.name)
    region: Region;
    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[];

    @ApiProperty({ example: false })
    @Column({ default: false })
    isVerified: boolean;
    @ApiProperty({ example: false })
    @Column({ default: false })
    isActive: boolean;
    @ApiProperty({ example: false })
    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;
    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const password = this.password;
        if (password) {
            this.password = await hash(password, 10);
        }
    }
}
