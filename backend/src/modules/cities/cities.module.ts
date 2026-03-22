import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
