import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, firstValueFrom } from 'rxjs';
import { CountryApiService } from '../interfaces/country-api.interface';

@Injectable()
export class RestCountriesService implements CountryApiService {
  constructor(private httpService: HttpService) {}

  async getCountryByCode(alpha3Code: string): Promise<any> {
    const url = `https://restcountries.com/v3.1/alpha/${alpha3Code}`;
    const response = await firstValueFrom(
      this.httpService.get(url).pipe(map(res => res.data))
    );
    const countryData = response[0]; // La API devuelve un arreglo, tomamos el primer elemento
    return {
      alpha3Code: countryData.cca3,
      name: countryData.name.common,
      region: countryData.region,
      subregion: countryData.subregion,
      capital: countryData.capital ? countryData.capital[0] : 'N/A',
      population: countryData.population,
      flag: countryData.flags.png,
    };
  }
}