import { IsString, IsDateString, IsOptional, IsAlpha, Length } from 'class-validator';

export class CreateTravelPlanDto {
  @IsAlpha()
  @Length(3, 3)
  countryAlpha3Code: string;

  @IsString()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}