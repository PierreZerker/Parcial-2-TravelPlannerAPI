import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from '../entities/travel-plan.entity';
import { CreateTravelPlanDto } from '../dto/create-travel-plan.dto';
import { CountriesService } from '../../countries/services/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private travelPlanRepository: Repository<TravelPlan>,
    private countriesService: CountriesService,
  ) {}

  async create(createTravelPlanDto: CreateTravelPlanDto): Promise<TravelPlan> {
    // Asegurarse de que el país exista (lo agrega a caché si no está)
    await this.countriesService.findOneByCode(createTravelPlanDto.countryAlpha3Code);

    const travelPlan = this.travelPlanRepository.create(createTravelPlanDto);
    return await this.travelPlanRepository.save(travelPlan);
  }

  async findAll(): Promise<TravelPlan[]> {
    return await this.travelPlanRepository.find();
  }

  async findOne(id: number): Promise<TravelPlan | null> { // <-- Agregamos null
    return await this.travelPlanRepository.findOne({ where: { id } });
  }
}