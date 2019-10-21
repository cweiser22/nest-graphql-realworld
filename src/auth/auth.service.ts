import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any>{
    const userRecord = await this.usersService.findOne({username})
    const matches = await argon2.verify(userRecord.password, password)
    if (userRecord && userRecord.password)
  }
}
