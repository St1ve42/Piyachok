import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { City } from '../../cities/entities/city.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Region {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: 'Вінницька область' })
    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.region)
    users: User[];
    @OneToMany(() => City, (city) => city.region)
    cities: City[];
}
