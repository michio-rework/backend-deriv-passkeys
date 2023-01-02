import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthenticationResponse } from './entities/auth-login.entity';
import { ILoginStatus } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description:
      'Checks if there is a User with the provided email, if not creates one and creates a token for them as well',
    type: AuthenticationResponse,
  })
  @Post('register')
  public async register(@Body() authCredentialsDto: AuthCredentialsDto) {
    const result: ILoginStatus = await this.authService.register(
      authCredentialsDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST, {
        cause: new Error(result.message),
      });
    }
    return result;
  }

  @ApiOkResponse({ description: 'Login', type: AuthenticationResponse })
  @Post('login')
  public async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }
}
