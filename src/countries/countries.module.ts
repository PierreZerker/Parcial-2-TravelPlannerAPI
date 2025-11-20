import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { CountriesService } from './services/countries.service';
import { CountriesController } from './controllers/countries.controller';
import { RestCountriesService } from './services/rest-countries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    HttpModule,
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    RestCountriesService,
    {
      provide: 'CountryApiService',
      useClass: RestCountriesService,
    },
  ],
  exports: [CountriesService],
})
export class CountriesModule {}