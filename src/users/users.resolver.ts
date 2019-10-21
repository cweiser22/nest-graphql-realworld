import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserInput } from './dtos/create-user.input';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id') id: number): Promise<User> {
    const userRecord = await this.usersService.findOne(id);
    if (!userRecord) {
      throw new NotFoundException('A user with that ID does not exist.');
    }
    return userRecord;
  }

  @Mutation(returns => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    try {
      const createdUser = await this.usersService.create(input);
      return createdUser;
    } catch (e) {
      //TODO: log this somewhere
      console.log(e);
      throw new BadRequestException();
    }
  }
}
