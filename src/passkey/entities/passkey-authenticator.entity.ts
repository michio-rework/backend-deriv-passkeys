import { ApiProperty } from '@nestjs/swagger';
import { PasskeyAuthenticator } from '@prisma/client';

export class PasskeyAuthenticatorEntity implements PasskeyAuthenticator {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  counter: number;

  @ApiProperty()
  credentialID: Buffer;

  @ApiProperty()
  credentialPublicKey: Buffer;

  @ApiProperty()
  attestationFormat: Buffer;

  @ApiProperty()
  credentialDeviceType: string;

  @ApiProperty()
  transports: string[];
}
