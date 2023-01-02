import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import {
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_LOGIN_SUCCESS,
  INVALID_TOKEN,
} from 'src/constants';
import { ILoginStatus, IToken } from './types';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ILoginStatus> {
    let status: ILoginStatus = {
      success: true,
      message: ACCOUNT_CREATE_SUCCESS,
    };

    try {
      const user = await this.usersService.create(authCredentialsDto);
      const token = this.createToken(user);
      status.id = user.id;
      status.email = user.email;
      status.token = token;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<ILoginStatus> {
    let status: ILoginStatus = {
      success: true,
      message: ACCOUNT_LOGIN_SUCCESS,
    };
    try {
      const user = await this.usersService.findByLogin(authCredentialsDto);
      const token = this.createToken(user);

      status.id = user.id;
      status.email = user.email;
      status.token = token;
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  createToken({ email }): IToken {
    const user: JwtPayload = { email };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: this.configService.get<string>('jwt.expiration'),
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException(
        new Error(INVALID_TOKEN),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
