import { SetMetadata } from '@nestjs/common';
// UserRole enumi qayerda bo'lsa, o'sha yerni import qiling
import { UserRole } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
