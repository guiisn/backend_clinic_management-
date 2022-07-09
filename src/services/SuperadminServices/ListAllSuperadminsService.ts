import { getRepository } from "typeorm";
import { Superadmin } from "../../entities/SuperadminEntitie";

export class ListAllSuperadminsService {
  async execute(): Promise<Superadmin[] | Error> {
    const repo = getRepository(Superadmin);

    try {
      const superadmins = await repo.find();

      return superadmins;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
