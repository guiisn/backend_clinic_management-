import { getRepository } from 'typeorm';
import { HealthSecretary } from '../../entities/HealthSecretary';

type ClincRequest = {
  query: string;
};

export class DeleteHealthSecretaryService {
  async execute({
    query,
  }: ClincRequest): Promise<'Secretary deleted!' | Error> {
    const repo = getRepository(HealthSecretary);

    try {
      await repo.delete(query);

      return 'Secretary deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
