import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminFoodAndDrinkBindOwnershipDto {
    @ApiProperty({ example: 'f08f9e27-a317-479c-afac-caa77e840194' })
    @IsString()
    @IsUUID()
    userId: string;
}
