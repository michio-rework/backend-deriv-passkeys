import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginOptionsPasskeyDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
