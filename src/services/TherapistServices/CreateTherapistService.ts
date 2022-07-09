import { getRepository } from 'typeorm';
import { Clinic } from '../../entities/ClinicEntitie';
import { Therapists } from '../../entities/TherapistEntitie';

type ClinicAdministratorRequest = {
  name: string;
  email: string;
  password: string;
  role: 'therapist';
  office: string;
  clinic_id: string;
};

export class CreateTherapistService {
  async execute({
    name,
    email,
    password,
    role,
    office,
    clinic_id,
  }: ClinicAdministratorRequest): Promise<Therapists | Error> {
    const repo = getRepository(Therapists);
    const clinicRepo = getRepository(Clinic);

    const therapistExists = await repo.findOne({
      where: { email },
      relations: ['clinic'],
    });
    const clinicExists = await clinicRepo.findOne({ where: { id: clinic_id } });

    if (therapistExists) {
      return new Error('Therapist already exists!');
    }

    if (!clinicExists) {
      return new Error('Clinic not exists!');
    }

    const therapist = repo.create({
      name,
      email,
      password,
      role,
      office,
      clinic_id,
    });

    await repo.save(therapist);

    return therapist;
  }
}
