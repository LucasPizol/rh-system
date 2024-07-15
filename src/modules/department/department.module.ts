import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DepartmentController } from './department.controller';
import {
  DepartmentRepository,
  DepartmentRepositoryBase,
} from './department.repository';
import { DepartmentService } from './department.service';

@Module({
  controllers: [DepartmentController],
  providers: [
    PrismaService,
    DepartmentService,
    {
      provide: DepartmentRepositoryBase,
      useClass: DepartmentRepository,
    },
  ],
})
export class DepartmentModule {}
