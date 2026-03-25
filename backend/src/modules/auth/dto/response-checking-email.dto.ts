import { ApiProperty } from '@nestjs/swagger';

export class ResponseCheckingEmailDto {
  @ApiProperty({
    example:
      'Лист був надісланий на пошту за адресою username@example.com. Активуйте акаунт за посиланням в ньому',
  })
  message: string;
}
