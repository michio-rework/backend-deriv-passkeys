import { ApiProperty } from '@nestjs/swagger';
import {
  AuthenticationExtensionsClientInputsFuture,
  PublicKeyCredentialDescriptorJSON,
  PublicKeyCredentialRequestOptionsJSON,
  UserVerificationRequirement,
} from '@simplewebauthn/typescript-types';
export class PasskeyLoginOptionEntity
  implements PublicKeyCredentialRequestOptionsJSON
{
  @ApiProperty()
  challenge: string;
  @ApiProperty()
  allowCredentials?: PublicKeyCredentialDescriptorJSON[];
  @ApiProperty()
  extensions?: AuthenticationExtensionsClientInputsFuture;
  @ApiProperty()
  rpId?: string;
  @ApiProperty()
  timeout?: number;
  @ApiProperty()
  userVerification?: UserVerificationRequirement;
}
