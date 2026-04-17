import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    BadRequestException,
    ClassSerializerInterceptor,
    ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints
                        ? Object.values(error.constraints)[0]
                        : '',
                }));

                return new BadRequestException({
                    statusCode: 400,
                    errorCode: 'BAD_REQUEST',
                    messages: result,
                });
            },
        }),
    );
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    const config = new DocumentBuilder()
        .setTitle('Пиячок API')
        .setDescription('Детальна документація API проєкту "Пиячок"')
        .setVersion('1.0.0')
        .addCookieAuth('accessToken', {
            type: 'apiKey',
            in: 'cookie',
            name: 'accessToken',
        })
        .addServer('http://localhost/api', 'Локальна розробка')
        .build();
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
