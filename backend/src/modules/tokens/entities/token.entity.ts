import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 300 })
    accessToken: string;
    @Column({ length: 300 })
    refreshToken: string;
    @Column()
    accessTokenExpiresAt: Date;
    @Column()
    refreshTokenExpiresAt: Date;
    @Column({ default: false })
    isBlocked: boolean;
    @Column({})
    jti: string;
    @Column({})
    userId: string;
    @ManyToOne(() => User, (user) => user.tokens)
    @JoinColumn({ name: 'userId' })
    user: User;
}
