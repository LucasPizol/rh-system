import { Body, Controller, Post, Request } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentRequestDTO } from './dto/create-department-request.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Request() req, @Body() department: CreateDepartmentRequestDTO) {
    const user = req.user;

    console.log(user);

    return await this.departmentService.create({
      ...department,
      companyId: user.companyId,
    });
  }
}
