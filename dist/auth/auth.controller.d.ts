import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ILoginStatus } from './types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(authCredentialsDto: AuthCredentialsDto): Promise<ILoginStatus>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<ILoginStatus>;
}
