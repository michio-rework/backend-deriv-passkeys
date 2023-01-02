import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyLoginPasskeyDto {
  @IsNotEmpty()
  @ApiProperty()
  credential: AuthenticationCredentialJSON;

  @IsEmail()
  @ApiProperty()
  email: string;
}
