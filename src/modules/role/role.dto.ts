import { UserRole } from '../../core/enums/user-role.enum';

export class RoleDto {
  readonly name: UserRole;
  readonly alias: string;
}
