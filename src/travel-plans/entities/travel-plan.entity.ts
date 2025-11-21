import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';

@Entity('travel_plans')
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryAlpha3Code: string; // Relación lógica

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

}