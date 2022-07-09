import { getRepository } from "typeorm";
import { Address } from "../../entities/AddressEntitie";

export class ListAllAdressesService {
  async execute(): Promise<Address[] | Error> {
    const repo = getRepository(Address);

    try {
      const adresses = await repo.find();

      return adresses;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
