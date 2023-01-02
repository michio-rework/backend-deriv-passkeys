import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  //use by auth module to register user in database
  async create(userDto: AuthCredentialsDto): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.prismaService.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    return await this.prismaService.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
      },
    });
  }
  //use by auth module to login user
  async findByLogin({
    email,
    password,
  }: AuthCredentialsDto): Promise<FormatLogin> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  //use by auth module to get user in database
  async findByPayload({ email }: any): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    return user;
  }

  async getMe(user: User) {
    const userData = await this.prismaService.user.findFirstOrThrow({
      where: { email: user.email },
      include: { PasskeyAuthenticators: true },
    });
    const response = {
      email: userData.email,
      authenticators: [],
    };
    if (userData.PasskeyAuthenticators.length) {
      response.authenticators = userData.PasskeyAuthenticators.map(
        (authenticator) => ({
          ...authenticator,
          credentialID: authenticator.credentialID.toString('base64'),
          credentialPublicKey:
            authenticator.credentialPublicKey.toString('base64'),
          attestationFormat: authenticator.attestationFormat.toString('base64'),
        }),
      );
    }
    return response;
  }
}
