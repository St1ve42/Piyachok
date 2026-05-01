import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    BadRequestException,
    ClassSerializerInterceptor,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            validationError: { target: false, value: false },
            exceptionFactory: (errors) => {
                const mapErrors = (
                    validationErrors: ValidationError[],
                    parentProperty = '',
                ): { property: string; message: string }[] => {
                    //Рекурсивне витягування помилок
                    return validationErrors.flatMap((error) => {
                        // Формуємо повний шлях до поля (наприклад: "tags.0.name")
                        const propertyPath = parentProperty
                            ? `${parentProperty}.${error.property}`
                            : error.property;

                        // Якщо у цього вузла є вкладені помилки (children)
                        if (error.children && error.children.length > 0) {
                            const childErrors = mapErrors(
                                error.children,
                                propertyPath,
                            );

                            // Якщо у самого вузла теж є констрейнти (буває рідко, але можливо),
                            // додаємо їх до результату разом з помилками дітей
                            if (error.constraints) {
                                return [
                                    {
                                        property: propertyPath,
                                        message: Object.values(
                                            error.constraints,
                                        )[0],
                                    },
                                    ...childErrors,
                                ];
                            }

                            return childErrors;
                        }

                        // Базовий випадок: якщо є констрейнти на поточному рівні
                        return {
                            property: propertyPath,
                            message: error.constraints
                                ? Object.values(error.constraints)[0]
                                : 'Validation failed',
                        };
                    });
                };

                const result = mapErrors(errors);

                return new BadRequestException({
                    statusCode: 400,
                    errorCode: 'BAD_REQUEST',
                    messages: result,
                });
            },
        }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
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
    app.set('query parser', 'extended');
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
