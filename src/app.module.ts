import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ContractModule } from './modules/contract/contract.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { OrderModule } from './modules/order/order.module';
import { ProductOrderModule } from './modules/product-order/product-order.module';
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
    OrderModule,
    CustomerModule,
    ProductOrderModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_PASSWORD,
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
