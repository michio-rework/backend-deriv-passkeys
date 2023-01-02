import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ILoginStatus, IToken } from './types';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly usersService;
    constructor(configService: ConfigService, jwtService: JwtService, usersService: UserService);
    register(authCredentialsDto: AuthCredentialsDto): Promise<ILoginStatus>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<ILoginStatus>;
    createToken({ email }: {
        email: any;
    }): IToken;
    validateUser(payload: JwtPayload): Promise<User>;
}
