import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@nestjs/class-validator';

export class LoginDto {
  @IsString()
  @IsEmail({}, { message: 'Please ener email correctly' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
