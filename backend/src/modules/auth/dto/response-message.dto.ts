import { ApiProperty } from '@nestjs/swagger';

export class ResponseMessageDto {
  @ApiProperty({
    example:
      'Лист був надісланий на пошту за адресою username@example.com. Активуйте акаунт за посиланням в ньому',
  })
  message: string;
}
