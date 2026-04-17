import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [SharedModule],
    controllers: [],
    providers: [FirebaseService],
    exports: [FirebaseService],
})
export class FirebaseModule {}
