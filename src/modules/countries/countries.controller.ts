import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from '@prisma/client';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) { }

  @Get('fetch')
  async fetchCountries() {
    return this.countriesService.fetchAndSaveCountries();
  }

 @Get('search/:name/:language?') // Додаємо знак питання, щоб зробити параметр необов'язковим
async findByNameAndLanguge(
  @Param('name') name: string,
  @Param('language') language?: string, // Зробіть language необов'язковим
): Promise<{ name: string; translations: any } | null> {
  return this.countriesService.findByNameAndLanguge(name, language);
 }
  
   @Get('searchname/:name') 
async getCountryByName(
  @Param('name') name: string,
): Promise<{ country:Country } | null> {
  return this.countriesService.findByName(name);
}

}
