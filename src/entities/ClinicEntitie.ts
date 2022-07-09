import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./AddressEntitie";

@Entity("clinics")
export class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @CreateDateColumn()
  created_at: Date;
}
