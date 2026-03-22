import {
  Column,
  CreateDateColumn,
  Entity,
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
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  providerId: string;
  @Column({ type: 'enum', enum: ProviderEnum, default: ProviderEnum.LOCAL })
  provider: ProviderEnum;
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
  @ManyToOne(() => City, (city) => city.users)
  city: City;
  @ManyToOne(() => Region, (region) => region.users)
  region: Region;
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
  @Column({ nullable: true })
  photo: string;
  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum;
  @Column({ nullable: true, unique: true })
  phone: string;
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
}
