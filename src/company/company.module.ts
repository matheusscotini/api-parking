import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.providers';
import { CompanyService } from './company.service';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...companyProviders,
    CompanyService,
  ],
  controllers:[
    CompanyController
  ],
  exports: [
    CompanyService
  ]
})

export class CompanyModule {}