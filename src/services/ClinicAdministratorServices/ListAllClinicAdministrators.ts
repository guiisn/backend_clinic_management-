import { getRepository } from "typeorm";
import { ClinicAdministrator } from "../../entities/ClinicAdministrator";

export class ListAllClinicAdministratorsService {
  async execute(): Promise<ClinicAdministrator[] | Error> {
    const repo = getRepository(ClinicAdministrator);

    try {
      const clinicAdministrator = await repo.find({ relations: ["clinic"] });

      return clinicAdministrator;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
