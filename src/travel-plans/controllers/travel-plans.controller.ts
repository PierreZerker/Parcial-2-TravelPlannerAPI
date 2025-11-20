import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { TravelPlansService } from '../services/travel-plans.service';
import { CreateTravelPlanDto } from '../dto/create-travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  @Post()
  async create(@Body() createTravelPlanDto: CreateTravelPlanDto) {
    return await this.travelPlansService.create(createTravelPlanDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const plan = await this.travelPlansService.findOne(+id);
    if (!plan) {
      throw new NotFoundException('Plan de viaje no encontrado');
    }
    return plan;
  }

  @Get()
  async findAll() {
    return await this.travelPlansService.findAll();
  }
}