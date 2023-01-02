import { ApiProperty } from '@nestjs/swagger';
import { RegistrationCredentialJSON } from '@simplewebauthn/typescript-types';
import { IsNotEmpty } from 'class-validator';

export class VerifyRegistrationPasskeyDto {
  @IsNotEmpty()
  @ApiProperty()
  credential: RegistrationCredentialJSON;
}
