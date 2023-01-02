import { Module } from '@nestjs/common';
import { PasskeyService } from './passkeys.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';
import { PasskeyController } from './passkey.controller';

@Module({
  providers: [PasskeyService, PrismaService, UserService],
  imports: [AuthModule],
  controllers: [PasskeyController],
})
export class PasskeyModule {}
