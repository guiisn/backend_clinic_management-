import { Request, Response } from 'express';
import { CreateAddressService } from '../../services/AddressServices/CreateAddressService';
import { DeleteAddressService } from '../../services/AddressServices/DeleteAddressService';
import { ListAllAdressesService } from '../../services/AddressServices/ListAllAdresses';
import { ListOneAddressService } from '../../services/AddressServices/ListOneAddress';
import { verifySuperadminPermissions } from '../../utils';

export class AddressController {
  async create(req: Request, res: Response) {
    const { street, number, district } = req.body;

    if (!verifySuperadminPermissions(req)) {
      return res.status(401).json('User not authorized!');
    }

    const service = new CreateAddressService();

    const result = await service.execute({
      street,
      number,
      district,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const { param } = req.params;
    const { street, number } = req.body;

    const service = new ListOneAddressService();

    const result = await service.execute({
      param,
      street,
      number,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const service = new ListAllAdressesService();

    const result = await service.execute();

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { query } = req.params;

    const service = new DeleteAddressService();

    const result = await service.execute({ query });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
