import { getRepository } from 'typeorm';
import { AdministrativeSecretary } from '../../entities/AdministrativeSecretary';
import { Clinic } from '../../entities/ClinicEntitie';

type AdministrativeSecretaryRequest = {
  name: string;
  email: string;
  password: string;
  role: 'admnistrativeSecretary';
  clinic_id: string;
};

export class CreateAdministrativeSecretaryService {
  async execute({
    name,
    email,
    password,
    role,
    clinic_id,
  }: AdministrativeSecretaryRequest): Promise<AdministrativeSecretary | Error> {
    const repo = getRepository(AdministrativeSecretary);
    const clinicRepo = getRepository(Clinic);

    const administrativeSecretaryExists = await repo.findOne({
      where: { email },
      relations: ['clinic'],
    });
    const clinicExists = await clinicRepo.findOne({ where: { id: clinic_id } });

    if (administrativeSecretaryExists) {
      return new Error('Administrative Secretary already exists!');
    }

    if (!clinicExists) {
      return new Error('Clinic not exists!');
    }

    const administrativeSecretary = repo.create({
      name,
      email,
      password,
      role,
      clinic_id,
    });

    await repo.save(administrativeSecretary);

    return administrativeSecretary;
  }
}
