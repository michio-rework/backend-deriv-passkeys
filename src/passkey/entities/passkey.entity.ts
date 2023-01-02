import { ApiProperty } from '@nestjs/swagger';
import { PasskeyRegistrationChallenge } from '@prisma/client';

export class PasskeyRegistrationChallengeEntity
  implements PasskeyRegistrationChallenge
{
  @ApiProperty()
  userId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  challenge: string;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  active: boolean;
}
