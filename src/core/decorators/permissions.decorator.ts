import { PermissionInterface } from '../interceptors/permission.interface';
import { SetMetadata } from '@nestjs/common';

export const Permissions = (
  ...permissions: Array<Partial<PermissionInterface>>
) => SetMetadata('permissions', permissions);
