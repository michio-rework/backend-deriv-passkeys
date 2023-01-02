import { PasskeyRegistrationChallenge } from '@prisma/client';
export declare class PasskeyRegistrationChallengeEntity implements PasskeyRegistrationChallenge {
    userId: number;
    id: number;
    challenge: string;
    verified: boolean;
    active: boolean;
}
