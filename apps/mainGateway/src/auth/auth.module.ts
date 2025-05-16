import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'apps/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({
    global: true,
    secret: 'nima'
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
