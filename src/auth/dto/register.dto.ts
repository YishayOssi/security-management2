import { IsString, IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../../users/dto/create-user.dto';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'No name entered!' })
  name: string;

  @IsEmail({}, { message: 'Invalid email!' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters!' })
  password: string;

  @IsEnum(UserRole, { message: 'The role must be soldier or commander!' })
  role: UserRole;
}
