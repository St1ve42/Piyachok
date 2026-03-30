// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
//
// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
//   catch(exception: any, host: ArgumentsHost): void {
//     const { httpAdapter } = this.httpAdapterHost;
//     const ctx = host.switchToHttp();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
//     const error = exception.response || exception.message;
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const responseBody = {
//       statusCode: status,
//       ...error,
//     };
//     httpAdapter.reply(ctx.getResponse(), responseBody, status);
//   }
// }

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as {
            error: string;
            message: string;
            context?: any;
          })
        : { message: exception.message };
    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      ...message,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
