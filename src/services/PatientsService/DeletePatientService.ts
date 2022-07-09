import { getRepository } from 'typeorm';
import { Patient } from '../../entities/Patients';
import { Therapists } from '../../entities/TherapistEntitie';

type ClincRequest = {
  patient_id: string;
};

export class DeletePatientService {
  async execute({
    patient_id,
  }: ClincRequest): Promise<'Patient deleted!' | Error> {
    const repo = getRepository(Patient);

    try {
      await repo.delete(patient_id);

      return 'Patient deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
