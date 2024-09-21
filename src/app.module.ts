import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './modules/countries/countries.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
