import { ApiProperty } from '@nestjs/swagger';
import { ILoginStatus } from '../types';
import { TokenEntity } from './token.entity';

export class AuthenticationResponse implements ILoginStatus {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: TokenEntity;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  id?: number;
}
