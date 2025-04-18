import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto.js';
import { User } from './user.entity.js';

import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';

import { LoginDTO } from '../auth/dto/login-dto.js';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 1.
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt(); // 2.
    user.password = await bcrypt.hash(userDTO.password, salt); // 3.

    const savedUser = await this.userRepository.save(user);
    delete (savedUser as any).password;
    return savedUser;
  }

  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }
  async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }
  async findByApiKey(apiKey: string): Promise<User | null> {
    return this.userRepository.findOneBy({ apiKey });
  }
}
