import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: 'user' })
    @Column()
    name: string;
    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
