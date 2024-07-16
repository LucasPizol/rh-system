import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ContractModule } from './modules/contract/contract.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { HistoricModule } from './modules/historic/historic.module';
import { ProductModule } from './modules/product/product.module';
import { AuthGuard } from './security/auth-guard';

console.log(process.env.JWT_SECRET_PASSWORD);

@Module({
  imports: [
    EmployeeModule,
    DepartmentModule,
    AuthModule,
    ContractModule,
    ProductModule,
    HistoricModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_PASSWORD,
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
