import { UserRoleEnum } from '../../../users/_utils/user-role.enum';
import { merge } from 'lodash';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

export function ProtectedAutoRolesDecorator(...roles: UserRoleEnum[]) {
  return (_target: any, _key: any, descriptor: any) => {
    const current = merge(
      { summary: '' },
      Reflect.getMetadata(DECORATORS.API_OPERATION, descriptor.value),
    );
    current.summary += ` (${roles.join(', ') || 'ALL'})`;

    Reflect.defineMetadata(DECORATORS.API_OPERATION, current, descriptor.value);
  };
}
