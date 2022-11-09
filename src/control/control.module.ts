import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { DatabaseModule } from 'src/database/database.module';
import { controlProviders } from './control.providers';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    DatabaseModule,
    CompanyModule
  ],
  controllers: [
    ControlController
  ],
  providers: [
    ...controlProviders,
    ControlService
  ]
})
export class ControlModule {}
