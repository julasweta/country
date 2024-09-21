import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../../prisma/prisma.service';
import { Country } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private readonly prismaService: PrismaService) { }

  async fetchAndSaveCountries() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countries = response.data;

      for (const country of countries) {
        await this.prismaService.country.create({
          data: {
            name_common: country.name?.common || '',
            name_official: country.name?.official || '',
            native_name_eng: country.name?.nativeName?.eng?.common || '',
            tld: country.tld || [],
            cca2: country.cca2 || '',
            ccn3: country.ccn3 || '',
            cca3: country.cca3 || '',
            independent: country.independent || false,
            status: country.status || '',
            un_member: country.unMember || false,
            currencies: country.currencies || {},
            idd_root: country.idd?.root || '',
            idd_suffixes: country.idd?.suffixes || [],
            capital: country.capital || [],
            alt_spellings: country.altSpellings || [],
            region: country.region || '',
            languages: country.languages || {},
            translations: country.translations || {},
            latlng: country.latlng || [],
            landlocked: country.landlocked || false,
            area: country.area || 0,
            demonyms: country.demonyms || {},
            flag: country.flags?.png || '',
            maps: country.maps || {},
            population: country.population || 0,
            car_signs: country.car?.signs || [],
            car_side: country.car?.side || '',
            timezones: country.timezones || [],
            continents: country.continents || [],
            flags_png: country.flags?.png || '',
            flags_svg: country.flags?.svg || '',
            coat_of_arms: country.coatOfArms || {},
            start_of_week: country.startOfWeek || '',
            capital_info_latlng: country.capitalInfo?.latlng || [],
          },
        });
      }

      return { message: 'Countries fetched and saved successfully!' };
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new Error('Error fetching countries');
    }
  }

  async findByName(name: string): Promise<Country | null> {
    try {
      const res = await this.prismaService.country.findFirst({
        where: {
          name_common: name,
        },
      });

      if (!res) {
        throw new NotFoundException(`Country with name ${name} not found`);
      }
      return res;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Перекидаємо помилку NotFoundException
      } else {
        console.error('Error finding country by name:', error);
        throw new InternalServerErrorException( `Failed to retrieve country data `
        );
      }
    }
  }
}
