import type { Request } from 'express';
import { IValidatePayload } from './IJwtPayload';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export interface IOptionalUserRequest extends Request {
    user: IValidatePayload | null;
}
