import { getRepository } from "typeorm";
import { ClinicAdministrator } from "../../entities/ClinicAdministrator";
import { Clinic } from "../../entities/ClinicEntitie";

type ClinicAdministratorRequest = {
  name: string;
  email: string;
  password: string;
  role: "clinicAdm";
  clinic_id: string;
};

export class CreateClinicAdministratorService {
  async execute({
    name,
    email,
    password,
    role,
    clinic_id,
  }: ClinicAdministratorRequest): Promise<ClinicAdministrator | Error> {
    const repo = getRepository(ClinicAdministrator);
    const clinicRepo = getRepository(Clinic);

    const clinicAdministratorExists = await repo.findOne({
      where: { email },
      relations: ["clinic"],
    });
    const clinicExists = await clinicRepo.findOne({ where: { id: clinic_id } });

    if (clinicAdministratorExists) {
      return new Error("Clinic Administrator already exists!");
    }

    if (!clinicExists) {
      return new Error("Clinic not exists!");
    }

    const clinicAdministrator = repo.create({
      name,
      email,
      password,
      role,
      clinic_id,
    });

    await repo.save(clinicAdministrator);

    return clinicAdministrator;
  }
}
