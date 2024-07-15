import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { HttpRequest } from 'src/security/auth-guard';
import { DepartmentService } from './department.service';
import { CreateDepartmentRequestDTO } from './dto/create-department-request.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(
    @Request() req: HttpRequest,
    @Body() department: CreateDepartmentRequestDTO,
  ) {
    const user = req.user;

    return await this.departmentService.create({
      ...department,
      companyId: user.companyId,
    });
  }

  @Get()
  async loadAll(@Request() req: HttpRequest) {
    const user = req.user;

    return await this.departmentService.loadAll(user.companyId);
  }

  @Put('/:id')
  async update(
    @Request() req: HttpRequest,
    @Body() department: CreateDepartmentRequestDTO,
    @Param('id') id: string,
  ) {
    const user = req.user;

    return await this.departmentService.update(
      { id, companyId: user.companyId },
      department,
    );
  }

  @Delete('/:id')
  async delete(@Request() req: HttpRequest, @Param('id') id: string) {
    const user = req.user;

    return await this.departmentService.delete({
      companyId: user.companyId,
      id,
    });
  }
}
