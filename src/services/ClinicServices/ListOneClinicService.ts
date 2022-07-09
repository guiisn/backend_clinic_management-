import { getRepository } from "typeorm";
import { Clinic } from "../../entities/ClinicEntitie";

type ClinicRequest = {
  param?: string;
};

export class ListOneClinicService {
  async execute({ param }: ClinicRequest): Promise<Clinic | Error> {
    const repo = getRepository(Clinic);

    try {
      const clinic = await repo.findOne({
        where: { id: param },
        relations: ["address"],
      });

      if (!clinic) {
        return new Error("Clinic not exixts!");
      }

      return clinic;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
