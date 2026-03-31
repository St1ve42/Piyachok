import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './shared/services/env.service';
import { TypeormModule } from './typeorm/typeorm.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { RegionsModule } from './modules/regions/regions.module';
import { CitiesModule } from './modules/cities/cities.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { EmailModule } from './modules/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (envService: EnvService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: envService.smtpUser,
            pass: envService.smtpPassword,
          },
        },
        defaults: {
          from: '"Пиячок" <noreply@example.com>',
        },
        template: {
          dir: path.join(__dirname, 'modules', 'email', 'templates', 'views'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(
              __dirname,
              'modules',
              'email',
              'templates',
              'partials',
            ),
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [EnvService],
    }),
    TypeormModule,
    SharedModule,
    UsersModule,
    RegionsModule,
    CitiesModule,
    RolesModule,
    AuthModule,
    TokensModule,
    EmailModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [
    EnvService,
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
