import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('Authentication failed.');
    }
    return user;
  }
}
