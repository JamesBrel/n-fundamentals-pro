import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsModule } from '../artists/artists.module.js';
import { UsersModule } from '../users/users.module.js';
import { ApiKeyStrategy } from './api-key-strategy.js';
import { authConstants } from './auth.constant.js';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard.js';
import { JwtStrategy } from './jwt-strategy.js';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, ApiKeyStrategy],
  controllers: [AuthController],
  // exports: [AuthService],
})
export class AuthModule {}
