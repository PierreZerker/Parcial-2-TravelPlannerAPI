import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import type { CountryApiService } from '../interfaces/country-api.interface';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
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
}