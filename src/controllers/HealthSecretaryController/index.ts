import { Request, Response } from 'express';
import { CreateHealthSecretaryService } from '../../services/HealthSecretariesServices/CreateHealthSecretaryService';
import { DeleteHealthSecretaryService } from '../../services/HealthSecretariesServices/DeleteHealthSecretaryService';
import { ListAllHealthSecretariesService } from '../../services/HealthSecretariesServices/ListAllHealthSecretaries';
import { verifySuperadminPermissions } from '../../utils';

export class HealthSecretaryController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!verifySuperadminPermissions(req)) {
      return res.status(401).json('User not authorized!');
    }

    const service = new CreateHealthSecretaryService();

    const result = await service.execute({
      name,
      email,
      password,
      role: 'healthSecretary',
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const service = new ListAllHealthSecretariesService();

    const result = await service.execute();

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { query } = req.params;

    const service = new DeleteHealthSecretaryService();

    const result = await service.execute({ query });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
