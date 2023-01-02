import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { PasskeyAuthenticatorEntity } from 'src/passkey/entities/passkey-authenticator.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: [PasskeyAuthenticatorEntity] })
  authenticators: PasskeyAuthenticatorEntity[];

  password: string;
}
