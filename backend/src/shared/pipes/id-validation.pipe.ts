import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

function idValidationPipe(strategy: 'increment' | 'uuid') {
    @Injectable()
    class IdValidationPipeMixin implements PipeTransform {
        transform(value: string): any {
            switch (strategy) {
                case 'uuid': {
                    const isUuid = isUUID(value);
                    if (!isUuid) {
                        throw new BadRequestException(
                            `Id ${value} не є коректним. Воно має бути формату uuid (наприклад, e2fecad4-8ca7-4a76-8354-8331309df863)`,
                        );
                    }
                    break;
                }
                case 'increment': {
                    const id: number = +value;
                    const fraction = id % 1;
                    const isNotValidId =
                        Number.isNaN(id) || id < 1 || fraction !== 0;
                    if (isNotValidId) {
                        throw new BadRequestException(
                            `Id ${value} не є коректним. Воно має бути цілим числом, більше 1`,
                        );
                    }
                    break;
                }
            }
            return value;
        }
    }
    return IdValidationPipeMixin;
}

export class RegionIdValidationPipe extends idValidationPipe('increment') {}
export class FoodAndDrinkIdValidationPipe extends idValidationPipe('uuid') {}
export class UserIdValidationPipe extends idValidationPipe('uuid') {}
