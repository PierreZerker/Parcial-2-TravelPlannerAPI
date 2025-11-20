export interface CountryApiService {
    getCountryByCode(alpha3Code: string): Promise<any>;
}