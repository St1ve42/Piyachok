import { BadRequestException, PipeTransform } from '@nestjs/common';

export class IdValidationPipe implements PipeTransform {
    transform(value: string): any {
        const numberId = Number(value);
        const isNaN = Number.isNaN(numberId);
        const isNotCorrectId = isNaN || numberId < 1 || !!(numberId % 1);
        if (isNotCorrectId) {
            throw new BadRequestException(
                `Id with ${value} is not correct. It is must be integer number and greater than 1`,
            );
        }
        return value;
    }
}
