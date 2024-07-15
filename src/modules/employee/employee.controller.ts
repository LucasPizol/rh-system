import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { HttpRequest } from 'src/security/auth-guard';
import { CreateEmployeeRequestDTO } from './dto/create-employee-request.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(
    @Body() data: CreateEmployeeRequestDTO,
    @Request() req: HttpRequest,
  ): Promise<Employee> {
    const user = req.user;

    return await this.employeeService.createEmployee({
      ...data,
      companyId: user.companyId,
    });
  }

  @Get()
  async loadAll(@Request() req: HttpRequest): Promise<Employee[]> {
    const user = req.user;

    return await this.employeeService.loadAll(user.companyId);
  }

  @Put('/:id')
  async update(
    @Body() data: Partial<CreateEmployeeRequestDTO>,
    @Request() req: HttpRequest,
  ): Promise<Employee> {
    const user = req.user;

    return await this.employeeService.update(
      {
        id: req.params.id,
        companyId: user.companyId,
      },
      data,
    );
  }
}
