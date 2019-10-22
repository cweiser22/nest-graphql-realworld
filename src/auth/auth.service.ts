import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userRecord = await this.usersService.findOne({ email });
    console.log(userRecord);
    const matches = await argon2.verify(userRecord.password, password);
    if (userRecord && matches) {
      const { password, ...result } = userRecord;
      return result;
    }
    return null;
  }

  async generateJWT(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
