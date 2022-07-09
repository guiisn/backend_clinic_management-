import { Request, Response } from 'express';
import { CreateClinicService } from '../../services/ClinicServices/CreateClinicService';
import { DeleteClinicService } from '../../services/ClinicServices/DeleteclinicService';
import { ListAllClinicsService } from '../../services/ClinicServices/ListAllClinicsService';
import { ListClinicAdmService } from '../../services/ClinicServices/ListClinicAdmService';
import { ListOneClinicService } from '../../services/ClinicServices/ListOneClinicService';

export class ClinicController {
  async create(req: Request, res: Response) {
    const { name, address_id } = req.body;

    const service = new CreateClinicService();

    const result = await service.execute({
      name,
      address_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const { param } = req.params;

    const service = new ListOneClinicService();

    const result = await service.execute({
      param,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const service = new ListAllClinicsService();

    const result = await service.execute();

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { query } = req.params;

    const service = new DeleteClinicService();

    const result = await service.execute({ query });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listClinicAdmService(req: Request, res: Response) {
    const { clinic_id } = req.params;

    const service = new ListClinicAdmService();

    const result = await service.execute({ clinic_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
