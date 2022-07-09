import { getRepository } from 'typeorm';
import { AdministrativeSecretary } from '../../entities/AdministrativeSecretary';

type ClincRequest = {
  admSecretary_id: string;
};

export class DeleteAdmnistrativeSecretary {
  async execute({
    admSecretary_id,
  }: ClincRequest): Promise<'Clinic Adm deleted!' | Error> {
    const repo = getRepository(AdministrativeSecretary);

    try {
      await repo.delete(admSecretary_id);

      return 'Clinic Adm deleted!';
    } catch (error: any) {
      return new Error(error);
    }
  }
}
