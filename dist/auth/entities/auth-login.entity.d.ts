import { ILoginStatus } from '../types';
import { TokenEntity } from './token.entity';
export declare class AuthenticationResponse implements ILoginStatus {
    email: string;
    token: TokenEntity;
    success: boolean;
    message: string;
    id?: number;
}
