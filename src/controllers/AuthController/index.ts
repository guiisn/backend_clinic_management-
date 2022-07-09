import { Request, Response } from 'express';

import { AuthenticateService } from '../../services/AuthServices/Authenticate';

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new AuthenticateService();

    const result = await service.execute({
      email,
      password,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
