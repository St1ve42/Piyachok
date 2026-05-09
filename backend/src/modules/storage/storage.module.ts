import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [SharedModule],
    controllers: [],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule {}
