import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from '@prisma/client';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('fetch')
  async fetchCountries() {
    return this.countriesService.fetchAndSaveCountries();
  }

  @Get('search/:name')
  async getCountryByName(@Param('name') name: string): Promise<Country | null> {
    return this.countriesService.findByName(name);
  }
}
