import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../../prisma/prisma.service';
import { Country } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private readonly prismaService: PrismaService) { }

  // Метод для отримання даних про країни і збереження їх у базу
  async fetchAndSaveCountries(): Promise<{ message: string }> {
    try {
      const { data: countries } = await axios.get('https://restcountries.com/v3.1/all');

      const createCountryPromises = countries.map(async (country: any) => {
        console.log(country); // Додайте це для перевірки

        const createdCountry = await this.prismaService.country.create({
          data: {
            name_common: country.name?.common || '',
            name_official: country.name?.official || '',
            native_name_eng: country.name?.nativeName?.eng?.common || null,
            tld: country.tld ? JSON.stringify(country.tld) : null,
            cca2: country.cca2 || null,
            ccn3: country.ccn3 || null,
            cca3: country.cca3 || null,
            independent: country.independent || null,
            status: country.status || null,
            un_member: country.unMember || null,
            currencies: country.currencies ? JSON.stringify(country.currencies) : null,
            idd_root: country.idd?.root || null,
            idd_suffixes: country.idd?.suffixes ? JSON.stringify(country.idd.suffixes) : null,
            capital: country.capital ? JSON.stringify(country.capital) : null,
            alt_spellings: country.altSpellings ? JSON.stringify(country.altSpellings) : null,
            region: country.region || '',
            languages: country.languages ? JSON.stringify(country.languages) : null,
            latlng: country.latlng ? JSON.stringify(country.latlng) : null,
            landlocked: country.landlocked || null,
            area: country.area || 0,
            demonyms: country.demonyms ? JSON.stringify(country.demonyms) : null,
            flag: country.flags?.png || '',
            maps: country.maps ? JSON.stringify(country.maps) : null,
            population: country.population || 0,
            car_signs: country.car?.signs ? JSON.stringify(country.car.signs) : null,
            car_side: country.car?.side || null,
            timezones: country.timezones ? JSON.stringify(country.timezones) : null,
            continents: country.continents ? JSON.stringify(country.continents) : null,
            flags_png: country.flags?.png || '',
            flags_svg: country.flags?.svg || '',
            coat_of_arms: country.coatOfArms ? JSON.stringify(country.coatOfArms) : null,
            start_of_week: country.startOfWeek || null,
            capital_info_latlng: country.capitalInfo?.latlng ? JSON.stringify(country.capitalInfo.latlng) : null,
            translations: {
              create: Object.entries(country.translations || {}).map(([language, translation]: [string, any]) => ({
                country_name: country.name?.common || '', // Назва країни
                language: language || '',                  // Мова
                official: translation?.official || '',     // Офіційна назва
                common: translation?.common || '',         // Звичайна назва
              })) || [],
            },

          },
        });

        return createdCountry; // Повертаємо створену країну
      });

      await Promise.all(createCountryPromises);

      return { message: 'Countries and translations fetched and saved successfully!' };
    } catch (error) {
      console.error('Error fetching or saving countries and translations:', error);
      throw new InternalServerErrorException('Error fetching or saving countries and translations');
    }
  }


  // Метод для пошуку країни за назвою
async findByName(name: string): Promise<{ country: any; translations: any[] }> {
  try {
    const country = await this.prismaService.country.findFirst({
      where: { name_common: name },
      include: { translations: true }, // Включаємо всі переклади
    });

    if (!country) {
      throw new NotFoundException(`Country with name "${name}" not found`);
    }
console.log(country);
    return {
      country, // Повертаємо весь об'єкт країни
      translations: country.translations || [], // Всі переклади
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to retrieve country data');
  }
}

async findByNameAndLanguge(name: string, language?: string): Promise<{ name: string; translations: any }> {
  try {
    const country = await this.prismaService.country.findFirst({
      where: { name_common: name },
      include: language ? { translations: { where: { language } } } : { translations: true },
    });

    if (!country) {
      throw new NotFoundException(`Country with name "${name}" not found`);
    }

    const translations = country.translations || [];

    // Якщо мова задана і є відповідні переклади
    const translation = (language && translations.length > 0) ? translations[0] : translations.length > 0 ? translations[0] : null;

    // Якщо translation є об'єктом, беремо country_name
    const countryName = translation && typeof translation === 'object'
      ? translation.country_name?.toString() || ''
      : '';

    return { 
      name: countryName,
      translations: translation 
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to retrieve country data');
  }
}





}
