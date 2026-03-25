import { ApiProperty } from '@nestjs/swagger';

export class ResponseErrorDto {
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({ example: 'ERROR_CODE' })
  errorCode: string;
  @ApiProperty({
    example: 'Опис помилки',
  })
  message: string;
}
