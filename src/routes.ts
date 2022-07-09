import { Router } from 'express';

import { AddressController } from './controllers/AddressController';
import { SuperadminController } from './controllers/SuperadminController';
import { ClinicController } from './controllers/ClinicController';
import { AuthController } from './controllers/AuthController';

import AuthMiddleware from './middlewares/AuthMiddleware';
import { ClinicAdministratorsController } from './controllers/ClinicAdministratorsController';
import { HealthSecretaryController } from './controllers/HealthSecretaryController';
import { TherapistsController } from './controllers/TherapistsController';
import { ProcedureController } from './controllers/ProcedureController';
import { PatientsController } from './controllers/PatientsController';
import { CoordinatorController } from './controllers/CoordinatorsController';
import { AdministrativeSecretaryController } from './controllers/AdministrativeSecretaryController';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({
    API: 'running',
    message: 'Developed by Geovane and Guilherme, 2022.',
  });
});

//authentication route
routes.post('/auth', new AuthController().authenticate);

// superadmin routes
routes.post('/superadmin', new SuperadminController().create);

routes.use(AuthMiddleware);

routes.get('/superadmin', new SuperadminController().listAll);
routes.get('/superadmin/:query', new SuperadminController().listOne);
routes.delete('/superadmin/:query', new SuperadminController().delete);

// address routes
routes.post('/address', new AddressController().create);
routes.get('/address', new AddressController().listAll);
routes.get(`/address/:param`, new AddressController().listOne);
routes.delete('address/:query', new AddressController().delete);

// clinics routes
routes.post('/clinic', new ClinicController().create);
routes.get('/clinic', new ClinicController().listAll);
routes.get(`/clinic/:param`, new ClinicController().listOne);
routes.delete('/clinic/:query', new ClinicController().delete);

routes.get(
  '/clinic/adm/:clinic_id',
  new ClinicController().listClinicAdmService
);

// clinic administrators routes
routes.post('/clinic-adm', new ClinicAdministratorsController().create);
routes.get('/clinic-adm', new ClinicAdministratorsController().listAll);
routes.get('/clinic-adm/:param', new ClinicAdministratorsController().listOne);
routes.get(
  '/clinic-adm/clinic/:clinic_id',
  new ClinicAdministratorsController().listAllByClinicID
);
routes.delete(
  '/clinic-adm/:clinicAdm_id',
  new ClinicAdministratorsController().delete
);

// health secretaries routes
routes.post('/health-secretaries', new HealthSecretaryController().create);
routes.get('/health-secretaries', new HealthSecretaryController().listAll);
routes.delete(
  '/health-secretaries/:query',
  new HealthSecretaryController().delete
);

// therapists routes
routes.post('/therapist', new TherapistsController().create);
routes.get('/therapist/:clinic_id', new TherapistsController().listAll);
routes.delete('/therapist/:therapist_id', new TherapistsController().delete);

//procedures routes
routes.post('/procedure', new ProcedureController().create);
routes.get('/procedure/:clinic_id', new ProcedureController().listAll);
routes.delete('/procedure/:procedure_id', new ProcedureController().delete);

//patients routes
routes.post('/patients', new PatientsController().create);
routes.get('/patients/:clinic_id', new PatientsController().listAll);
routes.delete('/patients/:patient_id', new PatientsController().delete);

//coordinators routes
routes.post('/coordinators', new CoordinatorController().create);
routes.get('/coordinators/:clinic_id', new CoordinatorController().listAll);
routes.delete(
  '/coordinators/:coordinator_id',
  new CoordinatorController().delete
);

// administrative secretary routes
routes.post('/adm-secretary', new AdministrativeSecretaryController().create);
routes.get(
  '/adm-secretary/:clinic_id',
  new AdministrativeSecretaryController().listAll
);
routes.delete(
  '/adm-secretary/:admSecretary_id',
  new AdministrativeSecretaryController().delete
);

export { routes };
