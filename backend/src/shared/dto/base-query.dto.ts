import { IsInt, IsOptional, Min } from 'class-validator';

export class BaseQueryDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @IsInt()
  @Min(0)
  @IsOptional()
  skip: number = 0;
}
