import { ApiProperty } from '@nestjs/swagger';
import {
  AttestationConveyancePreference,
  AuthenticationExtensionsClientInputsFuture,
  AuthenticatorSelectionCriteria,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialDescriptorJSON,
  PublicKeyCredentialParameters,
  PublicKeyCredentialRpEntity,
  PublicKeyCredentialUserEntityJSON,
} from '@simplewebauthn/typescript-types';

export class PasskeyRegisterOpitonEntity
  implements PublicKeyCredentialCreationOptionsJSON
{
  @ApiProperty()
  user: PublicKeyCredentialUserEntityJSON;

  @ApiProperty()
  challenge: string;

  @ApiProperty()
  excludeCredentials: PublicKeyCredentialDescriptorJSON[];

  @ApiProperty()
  extensions?: AuthenticationExtensionsClientInputsFuture;

  @ApiProperty()
  attestation?: AttestationConveyancePreference;

  @ApiProperty()
  authenticatorSelection?: AuthenticatorSelectionCriteria;

  @ApiProperty()
  pubKeyCredParams: PublicKeyCredentialParameters[];

  @ApiProperty({ description: 'Relying Party' })
  rp: PublicKeyCredentialRpEntity;

  @ApiProperty()
  timeout?: number;
}
