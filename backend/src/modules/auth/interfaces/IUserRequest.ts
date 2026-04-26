import type { Request } from 'express';
import { IExtendedJwtPayload } from './IJwtPayload';

export interface IUserRequest extends Request {
    user: IExtendedJwtPayload;
}
