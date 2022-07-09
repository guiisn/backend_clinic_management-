import { getRepository } from "typeorm";
import { ClinicAdministrator } from "../../entities/ClinicAdministrator";

type ClinicRequest = {
  clinic_id?: string;
};

export class ListClinicAdmService {
  async execute({ clinic_id }: ClinicRequest): Promise<ClinicAdministrator | Error> {
    const repoClinicAdm = getRepository(ClinicAdministrator)

    try {
      const clinicAdm = await repoClinicAdm.findOne({
        where: { clinic_id: clinic_id },
        //relations: ["clinic"],
      });

      if (!clinicAdm) {
        return new Error("Clinic Adm not exixts!");
      }

      return clinicAdm;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
