import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Piyachok } from '../../piyachok/entities/piyachok.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PiyachokReply {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text')
    text: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column()
    piyachokId: string;
    @Column()
    responderId: string;
    @ManyToOne(() => Piyachok, (piyachok) => piyachok.piyachokReplies, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'piyachokId' })
    piyachok: Piyachok;
    @ManyToOne(() => User, (user) => user.piyachokReplies, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'responderId' })
    responder: User;
}
