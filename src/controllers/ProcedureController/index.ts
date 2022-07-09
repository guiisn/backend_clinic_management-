import { Request, Response } from 'express';
import { CreateProceduresService } from '../../services/ProceduresServices/CreateProcedures';
import { DeleteProceduresService } from '../../services/ProceduresServices/DeleteProceduresService';
import { ListAllProceduresService } from '../../services/ProceduresServices/ListAllProceduresService';

export class ProcedureController {
  async create(req: Request, res: Response) {
    const { code, name, clinic_id } = req.body;

    const service = new CreateProceduresService();

    const result = await service.execute({
      code,
      name,
      clinic_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const { clinic_id } = req.params;

    const service = new ListAllProceduresService();

    const result = await service.execute({ clinic_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  //   async listOne(req: Request, res: Response) {
  //     const { param } = req.params;

  //     const service = new ListOneClinicAdministratorService();

  //     const result = await service.execute({
  //       param,
  //     });

  //     if (result instanceof Error) {
  //       return res.status(400).json(result.message);
  //     }

  //     return res.json(result);
  //   }

  async delete(req: Request, res: Response) {
    const { procedure_id } = req.params;

    const service = new DeleteProceduresService();

    const result = await service.execute({ procedure_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
