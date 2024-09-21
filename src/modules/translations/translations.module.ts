import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  providers: [TranslationsService, PrismaService]
})
export class TranslationsModule {}
