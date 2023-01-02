import { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types';
import { AuthenticationResponse } from 'src/auth/entities/auth-login.entity';
export declare class PasskeyAuthenticationResponse extends AuthenticationResponse {
    credential: AuthenticationCredentialJSON;
    verified: boolean;
}
