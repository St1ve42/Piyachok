import type { CookieOptions } from 'express';

export const cookiesOptionsConst: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
};
