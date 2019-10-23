import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthenticateInput } from './dtos/authenticate.input';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticateOutput } from './dtos/authenticate.output';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => AuthenticateOutput)
  async authenticate(@Args('input') input: AuthenticateInput) {
    const { email, password } = input;

    const result = await this.authService.validateUser(email, password);
    if (!result) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateJWT(result);
  }
}
