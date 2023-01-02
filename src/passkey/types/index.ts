import { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types';
import { ILoginStatus, IToken } from 'src/auth/types';

export interface IPasskeyLoginStatus extends ILoginStatus {
  success: boolean;
  message: string;
  id?: number;
  email?: string;
  token?: IToken;
  credential: AuthenticationCredentialJSON;
  verified: boolean;
}
