import {
    Injectable,
    OnModuleInit,
    UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EnvService } from '../../shared/services/env.service';
import { ErrorResponse } from '../../shared/error/error-response';
import type { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService implements OnModuleInit {
    constructor(private readonly envService: EnvService) {}
    onModuleInit(): any {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: this.envService.firebaseProjectId,
                    clientEmail: this.envService.firebaseClientEmail,
                    privateKey: this.envService.firebasePrivateKey,
                }),
            });
        }
    }

    async verifyToken(
        token: string,
    ): Promise<DecodedIdToken & { name?: string }> {
        try {
            return await admin.auth().verifyIdToken(token);
        } catch {
            throw new UnauthorizedException(
                new ErrorResponse(
                    'AUTH_INVALID_TOKEN',
                    'Токен є невалідний або його час вичерпався',
                ),
            );
        }
    }
}
