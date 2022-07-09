import { Request, Response } from 'express';
import { CreateAdministrativeSecretaryService } from '../../services/AdministrativeSecretaryServices/CreateAdministrativeSecretary';
import { DeleteAdmnistrativeSecretary } from '../../services/AdministrativeSecretaryServices/DeleteAdmnistrativeSecretary';
import { ListAllAdministrativeSecretaries } from '../../services/AdministrativeSecretaryServices/ListAllAdministrativeSecretaries';

export class AdministrativeSecretaryController {
  async create(req: Request, res: Response) {
    const { name, email, password, clinic_id } = req.body;

    const service = new CreateAdministrativeSecretaryService();

    const result = await service.execute({
      name,
      email,
      password,
      role: 'admnistrativeSecretary',
      clinic_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const { clinic_id } = req.params;

    const service = new ListAllAdministrativeSecretaries();

    const result = await service.execute({ clinic_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { admSecretary_id } = req.params;

    const service = new DeleteAdmnistrativeSecretary();

    const result = await service.execute({ admSecretary_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
