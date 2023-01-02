import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
