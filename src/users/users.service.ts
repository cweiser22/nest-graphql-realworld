import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.input';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    input.password = await argon2.hash(input.password);
    return await this.usersRepo.save(new User(input));
  }

  async findOneByID(id: number): Promise<User> {
    return await this.usersRepo.findOne(id);
  }

  async findOne(query: any): Promise<User> {
    return await this.usersRepo.findOne(query);
  }
}
