import { getRepository } from 'typeorm';
import { Procedure } from '../../entities/ProcedureEntitie';

type ClincRequest = {
  procedure_id: string;
};

export class DeleteProceduresService {
  async execute({
    procedure_id,
  }: ClincRequest): Promise<'Procedure deleted!' | Error> {
    const repo = getRepository(Procedure);

    try {
      await repo.delete(procedure_id);

      return 'Procedure deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
