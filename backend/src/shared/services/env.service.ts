import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  public readonly appPort: number;
  public readonly dbType: 'mysql' | 'mariadb';
  public readonly dbHost: string;
  public readonly dbPort: number;
  public readonly dbName: string;
  public readonly dbUser: string;
  public readonly dbPassword: string;
  public readonly accessSecret: string;
  public readonly refreshSecret: string;
  public readonly activateSecret: string;
  public readonly recoverySecret: string;
  public readonly accessExpiresIn: number;
  public readonly refreshExpiresIn: number;
  public readonly activateExpiresIn: number;
  public readonly recoveryExpiresIn: number;
  public readonly smtpUser: string;
  public readonly smtpPassword: string;

  constructor(private configService: ConfigService) {
    this.appPort = configService.get<number>('APP_PORT', 0);
    this.dbType = configService.get<'mysql' | 'mariadb'>('DB_TYPE', 'mysql');
    this.dbHost = configService.get<string>('DB_HOST', '');
    this.dbPort = configService.get<number>('DB_PORT', 0);
    this.dbName = configService.get<string>('DB_NAME', '');
    this.dbUser = configService.get<string>('DB_USER', '');
    this.dbPassword = configService.get<string>('DB_PASSWORD', '');
    this.accessSecret = configService.get<string>('ACCESS_SECRET', '');
    this.refreshSecret = configService.get<string>('REFRESH_SECRET', '');
    this.activateSecret = configService.get<string>('ACTIVATE_SECRET', '');
    this.recoverySecret = configService.get<string>('RECOVERY_SECRET', '');
    this.accessExpiresIn = configService.get<number>('ACCESS_EXPIRES_IN', 0);
    this.refreshExpiresIn = configService.get<number>('REFRESH_EXPIRES_IN', 0);
    this.activateExpiresIn = configService.get<number>(
      'ACTIVATE_EXPIRES_IN',
      0,
    );
    this.recoveryExpiresIn = configService.get<number>(
      'RECOVERY_EXPIRES_IN',
      0,
    );
    this.smtpUser = configService.get<string>('SMTP_USER', '');
    this.smtpPassword = configService.get<string>('SMTP_PASSWORD', '');
  }
}
