import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { City } from '../cities/entities/city.entity';
import { User } from '../users/entities/user.entity';
import { CitiesModule } from '../cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Region, City, User]), CitiesModule],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
