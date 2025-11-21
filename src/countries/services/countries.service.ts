import { Injectable, Inject, NotFoundException, ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import type { CountryApiService } from '../interfaces/country-api.interface';
import { TravelPlan } from 'src/travel-plans/entities/travel-plan.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(TravelPlan)
    private travelPlanRepository: Repository<TravelPlan>,
    @Inject('CountryApiService')
    private countryApiService: CountryApiService,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  async findOneByCode(alpha3Code: string): Promise<{ country: Country; source: 'cache' | 'api' }> {
    let country = await this.countryRepository.findOne({ where: { alpha3Code } });

    if (country) {
      return { country, source: 'cache' };
    }

    const apiData = await this.countryApiService.getCountryByCode(alpha3Code);
    if (!apiData) {
      throw new Error('País no encontrado en la API');
    }

    const newCountry = this.countryRepository.create(apiData);
    const savedCountry = await this.countryRepository.save(newCountry);

    const savedCountrySingle = Array.isArray(savedCountry) ? savedCountry[0]! : savedCountry;
    return { country: savedCountrySingle, source: 'api' };
  }

  async removeByCode(alpha3Code: string): Promise<void> {
    const country = await this.countryRepository.findOne({ where: { alpha3Code } });
    if (!country) {
      throw new NotFoundException('País no encontrado en la caché');
    }

    const count = await this.travelPlanRepository.count({ where: { countryAlpha3Code: alpha3Code } });
    if (count > 0) {
      throw new ForbiddenException('No se puede eliminar el país porque tiene planes de viaje asociados.');
    }

    await this.countryRepository.delete({ alpha3Code });
  }
}