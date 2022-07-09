import { getRepository } from "typeorm";
import { Clinic } from "../../entities/ClinicEntitie";

type ClincRequest = {
  query: string;
};

export class DeleteClinicService {
  async execute({ query }: ClincRequest): Promise<"Clinic deleted!" | Error> {
    const repo = getRepository(Clinic);

    try {
      await repo.delete(query);

      return "Clinic deleted!";
    } catch (error: any) {
      return new Error(error);
    }
  }
}
