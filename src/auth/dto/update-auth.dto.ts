import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';

// PartialType barcha maydonlarni (email, password) ixtiyoriy (optional) qilib beradi
export class UpdateAuthDto extends PartialType(CreateUserDto) {}
