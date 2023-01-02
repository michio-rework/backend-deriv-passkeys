import { ConfigService } from '@nestjs/config';
import { PasskeyAuthenticator, User } from '@prisma/client';
import { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialDescriptorFuture, RegistrationCredentialJSON } from '@simplewebauthn/typescript-types';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { VerifyLoginPasskeyDto } from './dto/verify-login-passkey.dto';
import { IPasskeyLoginStatus } from './types';
export declare class PasskeyService {
    private readonly configService;
    private readonly userService;
    private readonly prismaService;
    private readonly authService;
    constructor(configService: ConfigService, userService: UserService, prismaService: PrismaService, authService: AuthService);
    getUserAuthenticators(user: User): Promise<PasskeyAuthenticator[]>;
    getUserCredentials(user: User): Promise<PublicKeyCredentialDescriptorFuture[]>;
    checkStaleRegistrationChallenge(user: User): Promise<void>;
    checkStaleLoginChallenge(user: User): Promise<void>;
    requestRegisterPasskey(user: User): Promise<PublicKeyCredentialCreationOptionsJSON>;
    requestPasskeyLogin(email: string): Promise<import("@simplewebauthn/typescript-types").PublicKeyCredentialRequestOptionsJSON>;
    registerPasskey({ user, credential, }: {
        user: User;
        credential: RegistrationCredentialJSON;
    }): Promise<{
        verified: boolean;
    }>;
    passkeyLogin(passkeyLoginDto: VerifyLoginPasskeyDto): Promise<IPasskeyLoginStatus>;
}
