import { IsString, MaxLength, MinLength } from 'class-validator';

export class ReviewComplaintDto {
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    reason: 'text';
}
