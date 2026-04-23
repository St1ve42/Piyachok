import {
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
    Type,
} from '@nestjs/common';
import { RegionsService } from '../../modules/regions/regions.service';
import { FoodAndDrinkService } from '../../modules/food-and-drink/food-and-drink.service';

interface CanCheckExistence {
    isExistsById(id: number | string): Promise<boolean>;
}

function BodyValidationPipe(Service: Type<CanCheckExistence>) {
    @Injectable()
    class BodyValidationPipeMixin implements PipeTransform {
        constructor(@Inject(Service) readonly service: CanCheckExistence) {}
        async transform(value: number | string): Promise<any> {
            const isExistsEntity = await this.service.isExistsById(value);
            const entityName = Service.name
                .replace('Service', '')
                .replace(/s$/, '');
            if (!isExistsEntity) {
                throw new NotFoundException(
                    `${entityName} з id ${value} не знайдено`,
                );
            }
            return value;
        }
    }
    return BodyValidationPipeMixin;
}

@Injectable()
export class RegionBodyValidationPipe extends BodyValidationPipe(
    RegionsService,
) {}

@Injectable()
export class FoodAndDrinkBodyValidationPipe extends BodyValidationPipe(
    FoodAndDrinkService,
) {}
