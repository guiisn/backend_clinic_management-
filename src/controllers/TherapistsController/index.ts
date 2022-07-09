import { Request, Response } from 'express';
import { CreateTherapistService } from '../../services/TherapistServices/CreateTherapistService';
import { DeleteTherapistService } from '../../services/TherapistServices/DeleteTherapistService';
import { ListAllTherapistsService } from '../../services/TherapistServices/ListAllTherapistsService';

export class TherapistsController {
  async create(req: Request, res: Response) {
    const { name, email, password, clinic_id, office } = req.body;

    const service = new CreateTherapistService();

    const result = await service.execute({
      name,
      email,
      password,
      role: 'therapist',
      office,
      clinic_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const { clinic_id } = req.params;

    const service = new ListAllTherapistsService();

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
    const { therapist_id } = req.params;

    const service = new DeleteTherapistService();

    const result = await service.execute({ therapist_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
