import { getRepository } from "typeorm";
import { Clinic } from "../../entities/ClinicEntitie";

type ClinicRequest = {
  name: string;
  address_id: string;
};

export class CreateClinicService {
  async execute({ name, address_id }: ClinicRequest): Promise<Clinic | Error> {
    const repo = getRepository(Clinic);

    const clinicExists = await repo.findOne({
      where: { name },
      relations: ["address"],
    });

    if (clinicExists) {
      return new Error("Clinic already exists!");
    }

    const clinic = repo.create({
      name,
      address_id,
    });

    await repo.save(clinic);

    return clinic;
  }
}
