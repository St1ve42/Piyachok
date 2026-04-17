import type { Request } from 'express';
import { IJwtPayload } from './IJwtPayload';

export interface IUserRequest extends Request {
    user: IJwtPayload;
}
