import { getRepository } from 'typeorm';
import { HealthSecretary } from '../../entities/HealthSecretary';

export class ListAllHealthSecretariesService {
  async execute(): Promise<HealthSecretary[] | Error> {
    const repo = getRepository(HealthSecretary);

    try {
      const healthSecretary = await repo.find();

      return healthSecretary;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
