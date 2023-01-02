import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    me(req: any): Promise<{
        email: string;
        authenticators: any[];
    }>;
}
