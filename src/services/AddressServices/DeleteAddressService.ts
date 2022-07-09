import { getRepository } from "typeorm";
import { Address } from "../../entities/AddressEntitie";

type AddressRequest = {
  query: string;
};

export class DeleteAddressService {
  async execute({
    query,
  }: AddressRequest): Promise<"Address deleted!" | Error> {
    const repo = getRepository(Address);

    try {
      await repo.delete(query);

      return "Address deleted!";
    } catch (error: any) {
      return new Error(error);
    }
  }
}
