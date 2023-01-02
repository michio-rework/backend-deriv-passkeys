import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasskeyAuthenticator, User } from '@prisma/client';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialDescriptorFuture,
  RegistrationCredentialJSON,
} from '@simplewebauthn/typescript-types';
import { AuthService } from 'src/auth/auth.service';
// import { PASSKEY_LOGIN_SUCCESS } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { VerifyLoginPasskeyDto } from './dto/verify-login-passkey.dto';
import { IPasskeyLoginStatus } from './types';

@Injectable()
export class PasskeyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getUserAuthenticators(user: User): Promise<PasskeyAuthenticator[]> {
    return this.prismaService.passkeyAuthenticator.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async getUserCredentials(
    user: User,
  ): Promise<PublicKeyCredentialDescriptorFuture[]> {
    const authenticators = await this.getUserAuthenticators(user);

    const credentials: PublicKeyCredentialDescriptorFuture[] =
      authenticators.map((authenticator) => ({
        id: authenticator.credentialID,
        type: 'public-key',
        // Optional
        // transports: authenticator.transports,
      }));
    return credentials;
  }

  async checkStaleRegistrationChallenge(user: User): Promise<void> {
    // check if we already have a challenge for the user
    // if true change it's active field to false
    const staleChallenge =
      await this.prismaService.passkeyRegistrationChallenge.findFirst({
        where: {
          verified: false,
          userId: user.id,
          active: true,
        },
      });

    if (staleChallenge !== null) {
      await this.prismaService.passkeyRegistrationChallenge.update({
        where: { id: staleChallenge.id },
        data: {
          active: false,
        },
      });

      // HINT: I don't know if we should remove the old stale challenge or not here
      // await this.prismaService.passkeyChallenge.delete({
      //   where: { id: oldChallenge.id },
      // });
    }
  }

  async checkStaleLoginChallenge(user: User): Promise<void> {
    // check if we already have a challenge for the user
    // if true change it's active field to false
    const staleChallenge =
      await this.prismaService.passkeyLoginChallenge.findFirst({
        where: {
          verified: false,
          userId: user.id,
          active: true,
        },
      });

    if (staleChallenge !== null) {
      await this.prismaService.passkeyLoginChallenge.update({
        where: { id: staleChallenge.id },
        data: {
          active: false,
        },
      });

      // HINT: I don't know if we should remove the old stale challenge or not here
      // await this.prismaService.passkeyLoginChallenge.delete({
      //   where: { id: oldChallenge.id },
      // });
    }
  }

  async requestRegisterPasskey(
    user: User,
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    await this.checkStaleRegistrationChallenge(user);

    const credentials = await this.getUserCredentials(user);

    // TODO: implement exclude credentials here
    const options = generateRegistrationOptions({
      rpName: this.configService.get<string>('passkeys.rpName'),
      rpID: this.configService.get<string>('passkeys.rpID'),
      userID: String(user.id),
      userName: user.email,
      attestationType: 'none',
      excludeCredentials: credentials,
    });

    await this.prismaService.passkeyRegistrationChallenge.create({
      data: {
        userId: user.id,
        challenge: options.challenge,
      },
    });

    return options;
  }

  async requestPasskeyLogin(email: string) {
    const user = await this.userService.findByPayload({ email });

    const credentials = await this.getUserCredentials(user);

    await this.checkStaleLoginChallenge(user);

    const options = generateAuthenticationOptions({
      allowCredentials: credentials,
      userVerification: 'preferred',
    });
    await this.prismaService.passkeyLoginChallenge.create({
      data: {
        userId: user.id,
        challenge: options.challenge,
      },
    });
    return options;
  }

  async registerPasskey({
    user,
    credential,
  }: {
    user: User;
    credential: RegistrationCredentialJSON;
  }): Promise<{ verified: boolean }> {
    const expectedChallenge =
      await this.prismaService.passkeyRegistrationChallenge.findFirst({
        where: {
          userId: user.id,
          active: true,
          verified: false,
        },
      });

    const { challenge } = expectedChallenge;

    const registrationOptions: VerifyRegistrationResponseOpts = {
      credential,
      expectedChallenge: challenge,
      expectedOrigin: this.configService.get<string>('passkeys.origin'),
      expectedRPID: this.configService.get<string>('passkeys.rpID'),
    };
    const { verified, registrationInfo } = await verifyRegistrationResponse(
      registrationOptions,
    );
    if (verified) {
      await this.prismaService.passkeyRegistrationChallenge.update({
        where: { id: expectedChallenge.id },
        data: {
          verified: true,
          active: false,
        },
      });

      console.log('transports: ', credential.transports);

      await this.prismaService.passkeyAuthenticator.create({
        data: {
          userId: user.id,
          counter: registrationInfo.counter,
          credentialID: registrationInfo.credentialID,
          credentialPublicKey: registrationInfo.credentialPublicKey,
          attestationFormat: registrationInfo.attestationObject,
          credentialDeviceType: registrationInfo.credentialDeviceType,
          transports: credential.transports,
        },
      });
      return { verified };
    } else {
      const message = 'Verfication Not OK!';
      throw new HttpException(message, HttpStatus.BAD_REQUEST, {
        cause: new Error(message),
      });
    }
  }

  async passkeyLogin(
    passkeyLoginDto: VerifyLoginPasskeyDto,
  ): Promise<IPasskeyLoginStatus> {
    const { credential, email } = passkeyLoginDto;

    try {
      const user = await this.userService.findByPayload({ email });

      const expectedChallenge =
        await this.prismaService.passkeyLoginChallenge.findFirst({
          where: {
            userId: user.id,
            active: true,
            verified: false,
          },
        });

      const { challenge } = expectedChallenge;

      const validAuthenticator: PasskeyAuthenticator =
        await this.prismaService.passkeyAuthenticator.findFirstOrThrow({
          where: {
            userId: user.id,
            credentialID: Buffer.from(credential.id, 'base64'),
          },
        });
      const { transports, ...rest } = validAuthenticator;
      const { verified, authenticationInfo } =
        await verifyAuthenticationResponse({
          credential,
          expectedChallenge: challenge,
          expectedOrigin: this.configService.get<string>('passkeys.origin'),
          expectedRPID: this.configService.get<string>('passkeys.rpID'),
          authenticator: rest,
        });

      await this.prismaService.passkeyLoginChallenge.update({
        where: {
          id: expectedChallenge.id,
        },
        data: {
          verified: true,
          active: false,
        },
      });

      await this.prismaService.passkeyAuthenticator.update({
        where: {
          id: validAuthenticator.id,
        },
        data: {
          counter: authenticationInfo.newCounter,
        },
      });
      const token = this.authService.createToken(user);
      const status: IPasskeyLoginStatus = {
        id: user.id,
        email: user.email,
        token,
        verified,
        credential,
        success: true,
        message: "PASSKEY_LOGIN_SUCCESS",
      };
      return status;
    } catch (error) {
      throw new HttpException(new Error(error), HttpStatus.BAD_REQUEST);
    }
  }
}
