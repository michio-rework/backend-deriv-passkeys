import { Module } from '@nestjs/common';
import { PasskeyService } from './passkeys.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { PasskeyController } from './passkey.controller';

@Module({
  providers: [PasskeyService, PrismaService, UserService],
  imports: [AuthModule],
  controllers: [PasskeyController],
})
export class PasskeyModule {}
