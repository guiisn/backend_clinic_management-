import { getRepository } from 'typeorm';
import { Superadmin } from '../../entities/SuperadminEntitie';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ClinicAdministrator } from '../../entities/ClinicAdministrator';
import { Coordinator } from '../../entities/Coordinator';

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  async execute({
    email,
    password,
  }: AuthRequest): Promise<Superadmin | Error | ClinicAdministrator | any> {
    const superadminRepo = getRepository(Superadmin);
    const clinicAdmRepo = getRepository(ClinicAdministrator);
    const coordinatorRepo = getRepository(Coordinator);

    try {
      let user = {} as Superadmin | ClinicAdministrator | any;

      const isSuperadmin = await superadminRepo.findOne({ where: { email } });
      const isClinicAdm = await clinicAdmRepo.findOne({ where: { email } });
      const isCoordinator = await coordinatorRepo.findOne({ where: { email } });

      if (isSuperadmin) {
        user = isSuperadmin;
      } else if (isClinicAdm) {
        user = isClinicAdm;
      } else if (isCoordinator) {
        user = isCoordinator;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return new Error('Password does not match!');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, 'secret', {
        expiresIn: '1d',
      });

      delete user?.password;

      return { user, token };
    } catch (error: any) {
      return new Error(error);
    }
  }
}
