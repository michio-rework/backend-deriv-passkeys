import { AttestationConveyancePreference, AuthenticationExtensionsClientInputsFuture, AuthenticatorSelectionCriteria, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialDescriptorJSON, PublicKeyCredentialParameters, PublicKeyCredentialRpEntity, PublicKeyCredentialUserEntityJSON } from '@simplewebauthn/typescript-types';
export declare class PasskeyRegisterOpitonEntity implements PublicKeyCredentialCreationOptionsJSON {
    user: PublicKeyCredentialUserEntityJSON;
    challenge: string;
    excludeCredentials: PublicKeyCredentialDescriptorJSON[];
    extensions?: AuthenticationExtensionsClientInputsFuture;
    attestation?: AttestationConveyancePreference;
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    rp: PublicKeyCredentialRpEntity;
    timeout?: number;
}
