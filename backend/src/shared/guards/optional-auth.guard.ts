import { AuthGuard } from '@nestjs/passport';

export class OptionalAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any): any {
        if (err || !user) {
            return null;
        }
        return user;
    }
}
