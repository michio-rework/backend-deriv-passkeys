import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
interface FormatLogin extends Partial<User> {
    email: string;
}
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(userDto: AuthCredentialsDto): Promise<any>;
    findByLogin({ email, password, }: AuthCredentialsDto): Promise<FormatLogin>;
    findByPayload({ email }: any): Promise<User>;
    getMe(user: User): Promise<{
        email: string;
        authenticators: any[];
    }>;
}
export {};
