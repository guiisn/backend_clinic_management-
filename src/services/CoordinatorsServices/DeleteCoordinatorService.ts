import { getRepository } from 'typeorm';
import { Coordinator } from '../../entities/Coordinator';

type ClincRequest = {
  coordinator_id: string;
};

export class DeleteCoordinatorService {
  async execute({
    coordinator_id,
  }: ClincRequest): Promise<'Coordinator deleted!' | Error> {
    const repo = getRepository(Coordinator);

    try {
      await repo.delete(coordinator_id);

      return 'Coordinator deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
