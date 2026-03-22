import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  async signUp(dto: RegisterDto): Promise<User> {
    return 'This action adds a new auth';
  }

  signIn() {
    return `This action returns all auth`;
  }

  signInWithService(id: number) {
    return `This action removes a #${id} auth`;
  }

  logOut(id: number) {
    return `This action returns a #${id} auth`;
  }

  logOutAll(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  recoveryRequest(id: number) {
    return `This action removes a #${id} auth`;
  }

  recovery(id: number) {
    return `This action removes a #${id} auth`;
  }

  forgot(id: number) {
    return `This action removes a #${id} auth`;
  }
}
