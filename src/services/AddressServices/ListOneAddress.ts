import { getRepository } from "typeorm";
import { Address } from "../../entities/AddressEntitie";

type AddressRequest = {
  param?: string;
  street?: string;
  number?: string;
};

export class ListOneAddressService {
  async execute({
    param,
    street,
    number,
  }: AddressRequest): Promise<Address | Error> {
    const repo = getRepository(Address);

    try {
      const address = await repo.findOne({ where: { id: param } });

      if (!address) {
        return new Error("Address not exixts!");
      }

      return address;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
