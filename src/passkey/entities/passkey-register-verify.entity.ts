import { ApiProperty } from '@nestjs/swagger';

export class PasskeyRegisterVerifyEntity {
  @ApiProperty()
  verified: boolean;
}
