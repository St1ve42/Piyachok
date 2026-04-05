import type { CookieOptions } from 'express';

export const cookiesOptionsConst: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24,
};
