import { getRepository } from "typeorm";
import { Superadmin } from "../../entities/SuperadminEntitie";

type SuperadminRequest = {
  query: string;
};

export class DeleteSuperadminService {
  async execute({
    query,
  }: SuperadminRequest): Promise<"Superadmin deleted!" | Error> {
    const repo = getRepository(Superadmin);

    try {
      await repo.delete(query);

      return "Superadmin deleted!";
    } catch (error: any) {
      return new Error(error);
    }
  }
}
