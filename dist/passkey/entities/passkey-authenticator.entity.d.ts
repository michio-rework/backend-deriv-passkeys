/// <reference types="node" />
import { PasskeyAuthenticator } from '@prisma/client';
export declare class PasskeyAuthenticatorEntity implements PasskeyAuthenticator {
    id: number;
    userId: number;
    counter: number;
    credentialID: Buffer;
    credentialPublicKey: Buffer;
    attestationFormat: Buffer;
    credentialDeviceType: string;
    transports: string[];
}
