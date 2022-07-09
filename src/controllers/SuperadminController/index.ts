import { Request, Response } from "express";
import { CreateSuperadminService } from "../../services/SuperadminServices/CreateSuperadminService";
import { DeleteSuperadminService } from "../../services/SuperadminServices/DeleteSuperadmin";
import { ListAllSuperadminsService } from "../../services/SuperadminServices/ListAllSuperadminsService";
import { ListOneSuperadminService } from "../../services/SuperadminServices/ListOneSuperadmin";

export class SuperadminController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const service = new CreateSuperadminService();

    const result = await service.execute({
      name,
      email,
      password,
      role: "superadmin",
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const service = new ListAllSuperadminsService();

    const result = await service.execute();

    return res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const { query } = req.params;

    const service = new ListOneSuperadminService();

    const result = await service.execute({ query });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { query } = req.params;

    const service = new DeleteSuperadminService();

    const result = await service.execute({ query });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
