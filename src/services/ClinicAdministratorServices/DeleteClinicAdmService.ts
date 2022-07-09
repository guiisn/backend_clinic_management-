import { getRepository } from 'typeorm';
import { ClinicAdministrator } from '../../entities/ClinicAdministrator';

type ClincRequest = {
  clinicAdm_id: string;
};

export class DeleteClinicAdmService {
  async execute({
    clinicAdm_id,
  }: ClincRequest): Promise<'Clinic Adm deleted!' | Error> {
    const repo = getRepository(ClinicAdministrator);

    try {
      await repo.delete(clinicAdm_id);

      return 'Clinic Adm deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
