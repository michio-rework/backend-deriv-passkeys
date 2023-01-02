import { ApiProperty } from '@nestjs/swagger';
import { IToken } from '../types';

export class TokenEntity implements IToken {
  @ApiProperty()
  expiresIn: string;

  @ApiProperty()
  Authorization: string;
}
