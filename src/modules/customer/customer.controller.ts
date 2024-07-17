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
import { CustomerService } from './customer.service';
import { CreateCustomerRequestDTO } from './dto/create-customer-request-dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() data: CreateCustomerRequestDTO,
    @Request() req: HttpRequest,
  ) {
    return await this.customerService.createCustomer({
      ...data,
      companyId: req.user.companyId,
    });
  }

  @Get()
  async getCustomers(@Request() req: HttpRequest) {
    return await this.customerService.getCustomers(req.user.companyId);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() data: Partial<CreateCustomerRequestDTO>,
    @Request() req: HttpRequest,
  ) {
    return await this.customerService.updateCustomer(
      { id, companyId: req.user.companyId },
      data,
    );
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string, @Request() req: HttpRequest) {
    return await this.customerService.delete({
      id,
      companyId: req.user.companyId,
    });
  }
}
