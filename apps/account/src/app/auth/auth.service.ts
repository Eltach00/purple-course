import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.controller';
import { UserRepository } from '../user/repositories/user.repository';
import { UserRole } from '@purple-course/interfaces';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, displayName }: RegisterDto) {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) {
      throw new Error('Такой пользователь уже регистрирован');
    }
    const newUserEntity = await new UserEntity({
      email,
      displayName,
      role: UserRole.Student,
      passwordHash: '',
    }).setPassword(password);
    console.log('newUserEntity: ', newUserEntity);
    const newUser = await this.userRepository.createUser(newUserEntity);
    return newUser;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findById(email);
    console.log('user: ', user);
    if (!user) {
      throw new Error('Неверный логин или пароль');
    }
    console.log('here');
    const userEntity = new UserEntity(user);
    console.log('here2');
    console.log(userEntity);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error('Неверный логин или пароль');
    }

    return { id: userEntity._id };
  }

  async jwtAccess(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
