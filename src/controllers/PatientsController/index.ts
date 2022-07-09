import { Request, Response } from 'express';
import { CreatePatientService } from '../../services/PatientsService/CreatePatientService';
import { DeletePatientService } from '../../services/PatientsService/DeletePatientService';
import { ListAllPatientsService } from '../../services/PatientsService/ListAllPatients';

export class PatientsController {
  async create(req: Request, res: Response) {
    const { name, phone, cpf, birth_date, sus_card, clinic_id } = req.body;

    const service = new CreatePatientService();

    const result = await service.execute({
      name,
      phone,
      cpf,
      birth_date,
      sus_card,
      clinic_id,
    });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async listAll(req: Request, res: Response) {
    const { clinic_id } = req.params;

    const service = new ListAllPatientsService();

    const result = await service.execute({ clinic_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { patient_id } = req.params;

    const service = new DeletePatientService();

    const result = await service.execute({ patient_id });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
