import {
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { RegionsService } from '../../modules/regions/regions.service';

export interface CanCheckExistence {
  isExistsById(id: number | string): Promise<boolean>;
}

export function BodyValidationPipe(Service: Type<CanCheckExistence>) {
  @Injectable()
  class BodyValidationPipeMixin implements PipeTransform {
    constructor(@Inject(Service) readonly service: CanCheckExistence) {}
    async transform(value: number | string): Promise<any> {
      const isExistsEntity = await this.service.isExistsById(value);
      const entityName = Service.name.replace('Service', '').replace(/s$/, '');
      if (!isExistsEntity) {
        throw new NotFoundException(`${entityName} with ${value} not found`);
      }
      return value;
    }
  }
  return BodyValidationPipeMixin;
}

@Injectable()
export class RegionValidationPipe extends BodyValidationPipe(RegionsService) {}
