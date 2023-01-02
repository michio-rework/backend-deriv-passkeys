import { User } from '@prisma/client';
import { PasskeyAuthenticatorEntity } from '../../passkey/entities/passkey-authenticator.entity';
export declare class UserEntity implements User {
    id: number;
    email: string;
    authenticators: PasskeyAuthenticatorEntity[];
    password: string;
}
