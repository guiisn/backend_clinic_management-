import { getRepository } from 'typeorm';
import { Therapists } from '../../entities/TherapistEntitie';

type ClincRequest = {
  therapist_id: string;
};

export class DeleteTherapistService {
  async execute({
    therapist_id,
  }: ClincRequest): Promise<'Therapist deleted!' | Error> {
    const repo = getRepository(Therapists);

    try {
      await repo.delete(therapist_id);

      return 'Therapist deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
