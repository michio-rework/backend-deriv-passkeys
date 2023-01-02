import { AuthenticationExtensionsClientInputsFuture, PublicKeyCredentialDescriptorJSON, PublicKeyCredentialRequestOptionsJSON, UserVerificationRequirement } from '@simplewebauthn/typescript-types';
export declare class PasskeyLoginOptionEntity implements PublicKeyCredentialRequestOptionsJSON {
    challenge: string;
    allowCredentials?: PublicKeyCredentialDescriptorJSON[];
    extensions?: AuthenticationExtensionsClientInputsFuture;
    rpId?: string;
    timeout?: number;
    userVerification?: UserVerificationRequirement;
}
