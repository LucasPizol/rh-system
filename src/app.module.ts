import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [EmployeeModule, DepartmentModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
