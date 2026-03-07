import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './city.entity'; // Endi o'zimizning papkadan oladi
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'decimal' })
  salaryMin: number;

  @Column({ type: 'decimal' })
  salaryMax: number;

  @Column()
  cityId: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'cityId' })
  city: City;

   @Column()
  employerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'employerId' }) // Ustun nomini bog'lash
  employer: User;
    category: any;

  
}
