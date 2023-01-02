import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginOptionsPasskeyDto } from './dto/login-options-passkey.dto';
import { VerifyLoginPasskeyDto } from './dto/verify-login-passkey.dto';
import { VerifyRegistrationPasskeyDto } from './dto/verify-registration-passkey.dto';
import { PasskeyLoginOptionEntity } from './entities/passkey-login-option.entity';
import { PasskeyAuthenticationResponse } from './entities/passkey-login-verify-option.entity';
import { PasskeyRegisterOpitonEntity } from './entities/passkey-register-option.entity';
import { PasskeyRegisterVerifyEntity } from './entities/passkey-register-verify.entity';
import { PasskeyService } from './passkeys.service';

@ApiTags('passkeys')
@Controller('passkeys')
export class PasskeyController {
  constructor(private readonly passkeysService: PasskeyService) {}

  @ApiOkResponse({ type: PasskeyRegisterOpitonEntity })
  @Get('register/options')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  passkeyRegisterOptions(@Request() req) {
    return this.passkeysService.requestRegisterPasskey(req.user);
  }

  @Post('register')
  @ApiOkResponse({ type: PasskeyRegisterVerifyEntity })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-token')
  passkeyVerfiyRegisterOptions(
    @Request() req,
    @Body() verifyRegistrationPasskeyDto: VerifyRegistrationPasskeyDto,
  ) {
    return this.passkeysService.registerPasskey({
      user: req.user,
      credential: verifyRegistrationPasskeyDto.credential,
    });
  }

  @Post('login/options')
  @ApiOkResponse({ type: PasskeyLoginOptionEntity })
  passkeyLoginOptions(@Request() req, @Body() body: LoginOptionsPasskeyDto) {
    return this.passkeysService.requestPasskeyLogin(body.email);
  }

  @Post('login')
  @ApiOkResponse({ type: PasskeyAuthenticationResponse })
  passkeyVerfiyLoginOptions(
    @Request() req,
    @Body() verifyLoginPasskeyDto: VerifyLoginPasskeyDto,
  ) {
    return this.passkeysService.passkeyLogin(verifyLoginPasskeyDto);
  }
}
