import { getRepository } from 'typeorm';
import { Therapists } from '../../entities/TherapistEntitie';

type TherapistsRequest = {
  clinic_id: string;
};

export class ListAllTherapistsService {
  async execute({
    clinic_id,
  }: TherapistsRequest): Promise<Therapists[] | Error> {
    const repo = getRepository(Therapists);

    try {
      const therapists = await repo.findAndCount({ where: { clinic_id } });

      if (!therapists) {
        return new Error('Not Therapists for clinic.');
      }

      return therapists[0];
    } catch (error: any) {
      return new Error(error);
    }
  }
}
