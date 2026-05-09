import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnvService } from '../../shared/services/env.service';
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { itemNameEnum } from './enums/itemNameEnum';

@Injectable()
export class StorageService {
    private readonly s3Client: S3Client;
    constructor(private readonly envService: EnvService) {
        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${envService.r2AccountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: envService.r2AccessKeyId,
                secretAccessKey: envService.r2SecretAccessKey,
            },
        });
    }

    async uploadFile(
        file: Express.Multer.File,
        itemName: itemNameEnum,
        itemId: string,
    ): Promise<string> {
        const { buffer, mimetype, originalname } = file;
        const filePath = this.buildPath(itemName, itemId, originalname);
        const command = new PutObjectCommand({
            Body: buffer,
            ContentType: mimetype,
            Key: filePath,
            Bucket: this.envService.r2BucketName,
        });
        try {
            await this.s3Client.send(command);
            return filePath;
        } catch (e) {
            throw new InternalServerErrorException(
                `Сталась помилка при завантаженні файлу: ${(e as Error).message}`,
            );
        }
    }

    async deleteFile(filePath: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Key: filePath,
            Bucket: this.envService.r2BucketName,
        });
        try {
            await this.s3Client.send(command);
        } catch (e) {
            throw new InternalServerErrorException(
                `Сталась помилка при видаленні файлу: ${(e as Error).message}`,
            );
        }
    }

    private buildPath(
        itemName: string,
        itemId: string,
        fileName: string,
    ): string {
        return `${itemName}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
    }
}
