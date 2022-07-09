import { getRepository } from "typeorm";
import { Superadmin } from "../../entities/SuperadminEntitie";

type SuperadminRequest = {
  query: string;
};

export class ListOneSuperadminService {
  async execute({ query }: SuperadminRequest): Promise<Superadmin | Error> {
    const repo = getRepository(Superadmin);

    try {
      const superadminById = await repo.findOne({ where: { id: query } });

      let superadminByName: any;
      if (!superadminById) {
        superadminByName = await repo.findOne({ where: { name: query } });
        if (!superadminByName) {
          return new Error("Superadmin not found!");
        }
      }

      return superadminById || superadminByName;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
