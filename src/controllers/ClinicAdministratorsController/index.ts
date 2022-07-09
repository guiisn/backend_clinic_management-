import { Request, Response } from 'express';
import { CreateClinicAdministratorService } from '../../services/ClinicAdministratorServices/CreateClinicAdministrator';
import { DeleteClinicAdmService } from '../../services/ClinicAdministratorServices/DeleteClinicAdmService';
import { ListOneClinicAdministratorService } from '../../services/ClinicAdministratorServices/LisOneClinicAdministratorService';
import { ListAllByClinicClinicAdministratorService } from '../../services/ClinicAdministratorServices/ListAllByClinicClinicAdministratorService';
import { ListAllClinicAdministratorsService } from '../../services/ClinicAdministratorServices/ListAllClinicAdministrators';

export class ClinicAdministratorsController {
  async create(req: Request, res: Response) {
    const { name, email, password, clinic_id } = req.body;

    const service = new CreateClinicAdministratorService();

    const result = await service.execute({
      name,
      email,
      password,
      role: 'clinicAdm',
      clinic_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const service = new ListAllClinicAdministratorsService();

    const result = await service.execute();

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const { param } = req.params;

    const service = new ListOneClinicAdministratorService();

    const result = await service.execute({
      param,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAllByClinicID(req: Request, res: Response) {
    const { clinic_id } = req.params;
    const { userId } = req;

    const service = new ListAllByClinicClinicAdministratorService();

    const result = await service.execute({
      clinic_id,
      user_id: userId,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { clinicAdm_id } = req.params;

    const service = new DeleteClinicAdmService();

    const result = service.execute({
      clinicAdm_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
