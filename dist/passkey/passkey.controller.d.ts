import { LoginOptionsPasskeyDto } from './dto/login-options-passkey.dto';
import { VerifyLoginPasskeyDto } from './dto/verify-login-passkey.dto';
import { VerifyRegistrationPasskeyDto } from './dto/verify-registration-passkey.dto';
import { PasskeyService } from './passkeys.service';
export declare class PasskeyController {
    private readonly passkeysService;
    constructor(passkeysService: PasskeyService);
    passkeyRegisterOptions(req: any): Promise<import("@simplewebauthn/typescript-types").PublicKeyCredentialCreationOptionsJSON>;
    passkeyVerfiyRegisterOptions(req: any, verifyRegistrationPasskeyDto: VerifyRegistrationPasskeyDto): Promise<{
        verified: boolean;
    }>;
    passkeyLoginOptions(req: any, body: LoginOptionsPasskeyDto): Promise<import("@simplewebauthn/typescript-types").PublicKeyCredentialRequestOptionsJSON>;
    passkeyVerfiyLoginOptions(req: any, verifyLoginPasskeyDto: VerifyLoginPasskeyDto): Promise<import("./types").IPasskeyLoginStatus>;
}
