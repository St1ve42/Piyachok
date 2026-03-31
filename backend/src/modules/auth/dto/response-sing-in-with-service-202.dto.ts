import { ResponseUserFromServiceDto } from './response-user-from-service.dto';

export class ResponseSingInWithService202Dto {
  data: { user: ResponseUserFromServiceDto };
  statusCode: number;
}
