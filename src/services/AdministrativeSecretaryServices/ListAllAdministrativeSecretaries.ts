import { getRepository } from 'typeorm';
import { AdministrativeSecretary } from '../../entities/AdministrativeSecretary';

type PatientsRequest = {
  clinic_id: string;
};

export class ListAllAdministrativeSecretaries {
  async execute({
    clinic_id,
  }: PatientsRequest): Promise<AdministrativeSecretary[] | Error> {
    const repo = getRepository(AdministrativeSecretary);

    try {
      const admSecretaries = await repo.findAndCount({ where: { clinic_id } });

      if (!admSecretaries) {
        return new Error('Not Adm Secretaries for clinic.');
      }

      return admSecretaries[0];
    } catch (error: any) {
      return new Error(error);
    }
  }
}
