import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TranslationsService {
  constructor(private readonly prismaService: PrismaService) {}

 async createTranslation(
  countryId: number,
  countryName: any,
  language: string,
  official?: string,
  common?: string
): Promise<any> {
  return await this.prismaService.translation.create({
    data: {
      countryId,
      country_name: countryName,
      language,    // Додаємо мову
      official,    // Офіційна назва (необов'язкове)
      common,      // Звичайна назва (необов'язкове)
    },
  });
}

}
