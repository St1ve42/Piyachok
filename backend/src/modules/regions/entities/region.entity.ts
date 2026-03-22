import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { City } from '../../cities/entities/city.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.region)
  users: User[];
  @OneToMany(() => City, (city) => city.region)
  cities: City[];
}
