import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { AuthGuard } from '../../auth/guards/auth.guard';


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

  @Delete(':alpha3Code')
  @UseGuards(AuthGuard)
  async removeCountry(@Param('alpha3Code') alpha3Code: string) {
    await this.countriesService.removeByCode(alpha3Code);
    return { message: `País ${alpha3Code} eliminado correctamente.` };
  }
}