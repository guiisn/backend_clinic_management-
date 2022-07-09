import { getRepository } from 'typeorm';
import { ClinicAdministrator } from '../../entities/ClinicAdministrator';

type ClinicAdministratorRequest = {
  clinic_id?: string;
  user_id?: string;
};

export class ListAllByClinicClinicAdministratorService {
  async execute({
    clinic_id,
    user_id,
  }: ClinicAdministratorRequest): Promise<ClinicAdministrator[] | Error> {
    const repo = getRepository(ClinicAdministrator);

    try {
      const clinicAdministrator = await repo.findAndCount({
        where: { clinic_id },
      });

      if (!clinicAdministrator) {
        ('');
        return new Error('Clinic Administrator not exixts!');
      }

      const result = clinicAdministrator[0].filter((adm) => {
        return adm.id !== user_id;
      });

      return result;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
