import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { TranslationsService } from '../translations/translations.service';

@Module({
  imports:[],
  controllers: [CountriesController],
  providers: [CountriesService, PrismaService, TranslationsService],
})
export class CountriesModule {}
