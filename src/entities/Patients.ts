import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Clinic } from './ClinicEntitie';
import { Therapists } from './TherapistEntitie';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sus_card: string;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column()
  birth_date: string;

  @Column()
  clinic_id: string;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @CreateDateColumn()
  created_at: Date;
}
