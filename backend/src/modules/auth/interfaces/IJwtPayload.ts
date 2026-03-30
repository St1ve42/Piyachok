export interface IJwtPayload {
  userId: string;
  role: string;
  jti: string;
  isActive: boolean;
  isDeleted: boolean;
}
