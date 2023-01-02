import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export interface JwtPayload {
    email: string;
}
export {};
