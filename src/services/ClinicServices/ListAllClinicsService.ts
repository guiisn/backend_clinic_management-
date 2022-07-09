import { getRepository } from "typeorm";
import { Clinic } from "../../entities/ClinicEntitie";

export class ListAllClinicsService {
  async execute(): Promise<Clinic[] | Error> {
    const repo = getRepository(Clinic);

    try {
      const clinics = await repo.find({ relations: ["address"] });

      return clinics;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
