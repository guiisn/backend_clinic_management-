import { getRepository } from 'typeorm';
import { Procedure } from '../../entities/ProcedureEntitie';

type TherapistsRequest = {
  clinic_id: string;
};

export class ListAllProceduresService {
  async execute({
    clinic_id,
  }: TherapistsRequest): Promise<Procedure[] | Error> {
    const repo = getRepository(Procedure);

    try {
      const procedures = await repo.findAndCount({ where: { clinic_id } });

      if (!procedures) {
        return new Error('Not Procedure for clinic.');
      }

      return procedures[0];
    } catch (error: any) {
      return new Error(error);
    }
  }
}
