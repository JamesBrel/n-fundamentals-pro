import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateUserDTO } from '../users/dto/create-user-dto.js';
import { User } from '../users/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { AuthService } from './auth.service.js';
import { LoginDTO } from './dto/login-dto.js';

import { AuthGuard } from '@nestjs/passport';
import { ValidateTokenDTO } from './dto/validate-token-dto.js';
import { JwtAuthGuard } from './jwt-guard.js';
import { Enable2FAType } from './types.js';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('/login')
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }

  @Get('/enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(
    @Req()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('/validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Req()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }
  @Get('/disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Req()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Req()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }
}
