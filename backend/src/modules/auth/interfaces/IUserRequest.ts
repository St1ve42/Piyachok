import type { Request } from 'express';
import { IValidatePayload } from './IJwtPayload';

export interface IUserRequest extends Request {
    user: IValidatePayload;
}
