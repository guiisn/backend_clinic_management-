import { getRepository } from 'typeorm';
import { Coordinator } from '../../entities/Coordinator';
import { Patient } from '../../entities/Patients';

type CoordinatorsRequest = {
  clinic_id: string;
};

export class ListAllCoordinatorsService {
  async execute({
    clinic_id,
  }: CoordinatorsRequest): Promise<Coordinator[] | Error> {
    const repo = getRepository(Coordinator);

    try {
      const coordinator = await repo.findAndCount({ where: { clinic_id } });

      if (!coordinator) {
        return new Error('Not Coordinators for clinic.');
      }

      return coordinator[0];
    } catch (error: any) {
      return new Error(error);
    }
  }
}
