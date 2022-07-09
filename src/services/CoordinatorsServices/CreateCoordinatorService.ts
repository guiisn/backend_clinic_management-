import { getRepository } from 'typeorm';
import { Coordinator } from '../../entities/Coordinator';

type CoordinatorRequest = {
  name: string;
  email: string;
  password: string;
  role: 'coordinator';
  clinic_id: string;
};

export class CreateCoordinatorService {
  async execute({
    name,
    email,
    password,
    role,
    clinic_id,
  }: CoordinatorRequest): Promise<Coordinator | Error> {
    const repo = getRepository(Coordinator);

    const coordinatorExists = await repo.findOne({ where: { email } });

    if (coordinatorExists) {
      return new Error('Coordinator already exists!');
    }

    const coordinator = repo.create({
      name,
      email,
      password,
      role,
      clinic_id,
    });

    await repo.save(coordinator);

    return coordinator;
  }
}
