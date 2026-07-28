import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    Repository,
} from 'typeorm';
import { CreatePiyachokReplyDto } from './dto/create-piyachok-request.dto';
import { UpdatePiyachokReplyDto } from './dto/update-piyachok-request.dto';
import { PiyachokReply } from './entities/piyachok-reply.entity';
import { Piyachok } from '../piyachok/entities/piyachok.entity';
import { QueryBaseDto } from '../../shared/dto/query-base.dto';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PiyachokRepliesService {
    constructor(
        @InjectRepository(PiyachokReply)
        private readonly piyachokReplyRepository: Repository<PiyachokReply>,
        @InjectRepository(Piyachok)
        private readonly piyachokRepository: Repository<Piyachok>,
    ) {}

    async find(
        piyachokId: string,
        query: QueryBaseDto,
    ): Promise<{
        data: PiyachokReply[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
        skip: number;
    }> {
        const { limit, page, skip } = query;

        const select: FindOptionsSelect<PiyachokReply> = {
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
            responder: {
                id: true,
                name: true,
                surname: true,
                photo: true,
            },
        };

        const relations: FindOptionsRelations<PiyachokReply> = {
            responder: true,
        };

        const order: FindOptionsOrder<PiyachokReply> = {
            createdAt: 'desc',
        };

        const [data, total] = await this.piyachokReplyRepository.findAndCount({
            where: { piyachokId },
            select,
            relations,
            order,
            relationLoadStrategy: 'query',
            take: limit,
            skip: UtilsService.calculateSkipRecords(page, limit, skip),
        });

        const totalPages = UtilsService.calculateTotalPages(total, skip, limit);
        return { data, total, totalPages, page, limit, skip };
    }

    async create(
        createPiyachokReplyDto: CreatePiyachokReplyDto,
        responderId: string,
    ): Promise<PiyachokReply> {
        const { piyachokId } = createPiyachokReplyDto;
        const piyachokExists = await this.piyachokRepository.existsBy({
            id: piyachokId,
        });

        if (!piyachokExists) {
            throw new NotFoundException(
                `Пиячок з id ${piyachokId} не знайдено`,
            );
        }

        const reply = this.piyachokReplyRepository.create({
            ...createPiyachokReplyDto,
            responderId,
        });

        const select: FindOptionsSelect<PiyachokReply> = {
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
        };

        await this.piyachokReplyRepository.insert(reply);
        return (await this.piyachokReplyRepository.findOne({
            where: { id: reply.id },
            select,
        })) as PiyachokReply;
    }

    async update(
        id: string,
        updatePiyachokReplyDto: UpdatePiyachokReplyDto,
    ): Promise<void> {
        await this.piyachokReplyRepository.update(id, updatePiyachokReplyDto);
    }

    async delete(id: string): Promise<void> {
        await this.piyachokReplyRepository.delete(id);
    }

    async hasPermission(id: string, userId: string): Promise<boolean> {
        const piyachokReply = await this.piyachokReplyRepository.findOneBy({
            id,
        });
        if (!piyachokReply) {
            throw new NotFoundException('Пиячок не знайдено');
        }
        const { responderId } = piyachokReply;
        return responderId === userId;
    }
}
