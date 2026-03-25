import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from '../../regions/entities/region.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class City {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'с. Абрамівська Долина' })
  @Column()
  name: string;
  @Column()
  regionId: number;
  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: 'regionId' })
  region: Region;
  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
