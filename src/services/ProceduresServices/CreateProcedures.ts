import { getRepository } from 'typeorm';
import { Clinic } from '../../entities/ClinicEntitie';
import { Procedure } from '../../entities/ProcedureEntitie';

type ProceduresRequest = {
  code: string;
  name: string;
  clinic_id: string;
};

export class CreateProceduresService {
  async execute({
    code,
    name,
    clinic_id,
  }: ProceduresRequest): Promise<Procedure | Error> {
    const repo = getRepository(Procedure);
    const clinicRepo = getRepository(Clinic);

    const procedureExists = await repo.findOne({
      where: { name },
    });

    const clinicExists = await clinicRepo.findOne({ where: { id: clinic_id } });

    if (procedureExists) {
      return new Error('Procedure already exists!');
    }

    if (!clinicExists) {
      return new Error('Clinic not exists!');
    }

    const procedure = repo.create({
      code,
      name,
      clinic_id,
    });

    await repo.save(procedure);

    return procedure;
  }
}
