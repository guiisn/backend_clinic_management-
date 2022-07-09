import { getRepository } from "typeorm";
import { Superadmin } from "../../entities/SuperadminEntitie";

type SuperadminRequest = {
  name: string;
  email: string;
  password: string;
  role: "superadmin";
};

export class CreateSuperadminService {
  async execute({
    name,
    email,
    password,
    role,
  }: SuperadminRequest): Promise<Superadmin | Error> {
    const repo = getRepository(Superadmin);

    const superadminExists = await repo.findOne({ where: { email } });

    if (superadminExists) {
      return new Error("Superadmin already exists!");
    }

    const superadmin = repo.create({
      name,
      email,
      password,
      role,
    });

    await repo.save(superadmin);

    return superadmin;
  }
}
