import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
