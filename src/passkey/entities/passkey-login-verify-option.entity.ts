import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types';
import { AuthenticationResponse } from 'src/auth/entities/auth-login.entity';

export class PasskeyAuthenticationResponse extends AuthenticationResponse {
  @ApiProperty()
  credential: AuthenticationCredentialJSON;

  @ApiProperty()
  verified: boolean;
}
