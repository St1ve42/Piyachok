export class CreateTokenDto {
  userId: string;
  role: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  jti: string;
}
