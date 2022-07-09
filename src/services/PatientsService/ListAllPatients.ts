import { getRepository } from 'typeorm';
import { Patient } from '../../entities/Patients';
import { Therapists } from '../../entities/TherapistEntitie';

type PatientsRequest = {
  clinic_id: string;
};

export class ListAllPatientsService {
  async execute({ clinic_id }: PatientsRequest): Promise<Patient[] | Error> {
    const repo = getRepository(Patient);

    try {
      const patients = await repo.findAndCount({ where: { clinic_id } });

      if (!patients) {
        return new Error('Not Therapists for clinic.');
      }

      return patients[0];
    } catch (error: any) {
      return new Error(error);
    }
  }
}
