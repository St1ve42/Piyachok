import {
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { Region } from '../../modules/regions/entities/region.entity';
import { RegionsService } from '../../modules/regions/regions.service';

export interface CanCheckExistence<T> {
  findById(id: number | string): Promise<T | null>;
}

export function BodyValidationPipe<T>(Service: Type<CanCheckExistence<T>>) {
  @Injectable()
  class BodyValidationPipeMixin implements PipeTransform {
    constructor(@Inject(Service) readonly service: CanCheckExistence<T>) {}
    async transform(value: number | string): Promise<any> {
      const entity = await this.service.findById(value);
      const entityName = Service.name.replace('Service', '').replace(/s$/, '');
      if (!entity) {
        throw new NotFoundException(`${entityName} with ${value} not found`);
      }
      return value;
    }
  }
  return BodyValidationPipeMixin;
}

@Injectable()
export class RegionValidationPipe extends BodyValidationPipe<Region>(
  RegionsService,
) {}
