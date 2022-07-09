import { Request } from 'express';

const verifySuperadminPermissions = (req: Request) => {
  const { userRole } = req;

  if (userRole !== 'superadmin') {
    return false;
  }

  return true;
};

export { verifySuperadminPermissions };
