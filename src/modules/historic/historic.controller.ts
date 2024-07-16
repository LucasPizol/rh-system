import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Request,
} from '@nestjs/common';
import { HttpRequest } from 'src/security/auth-guard';
import { CreateHistoricBodyRequestDTO } from './dto/create-historic-body-request.dto';
import { HistoricService } from './historic.service';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Post()
  async create(
    @Request() req: HttpRequest,
    @Body() body: CreateHistoricBodyRequestDTO,
  ) {
    return await this.historicService.create({
      ...body,
      companyId: req.user.companyId,
      userId: req.user.id,
    });
  }

  @Get()
  async findAll(@Request() req: HttpRequest) {
    return await this.historicService.findAll(req.user.companyId);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Request() req: HttpRequest) {
    return await this.historicService.delete({
      id: req.params.id,
      companyId: req.user.companyId,
    });
  }
}
