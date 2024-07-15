import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeeController } from './employee.controller';
import {
  EmployeeRepository,
  EmployeeRepositoryBase,
} from './employee.repository';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [
    PrismaService,
    EmployeeService,
    EmployeeRepository,
    { provide: EmployeeRepositoryBase, useClass: EmployeeRepository },
  ],
})
export class EmployeeModule {}
