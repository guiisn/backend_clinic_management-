import { getRepository } from 'typeorm';
import { Clinic } from '../../entities/ClinicEntitie';
import { Patient } from '../../entities/Patients';

type PatientRequest = {
  name: string;
  sus_card: string;
  phone: string;
  cpf: string;
  birth_date: string;
  clinic_id: string;
};

export class CreatePatientService {
  async execute({
    name,
    sus_card,
    phone,
    cpf,
    birth_date,
    clinic_id,
  }: PatientRequest): Promise<Patient | Error> {
    const repo = getRepository(Patient);
    const clinicRepo = getRepository(Clinic);

    const procedureExists = await repo.findOne({
      where: { name },
    });

    const clinicExists = await clinicRepo.findOne({ where: { id: clinic_id } });

    if (procedureExists) {
      return new Error('Procedure already exists!');
    }

    if (!clinicExists) {
      return new Error('Clinic not exists!');
    }

    const patient = repo.create({
      name,
      sus_card,
      phone,
      cpf,
      birth_date,
      clinic_id,
    });

    await repo.save(patient);

    return patient;
  }
}
