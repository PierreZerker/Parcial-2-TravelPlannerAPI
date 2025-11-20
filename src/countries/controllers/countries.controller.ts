import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get(':alpha3Code')
  async getCountry(@Param('alpha3Code') alpha3Code: string): Promise<any> {
    const result = await this.countriesService.findOneByCode(alpha3Code);
    return {
      ...result.country,
      source: result.source,
    };
  }

  @Get()
  async getAllCountries() {
    return await this.countriesService.findAll();
  }
}