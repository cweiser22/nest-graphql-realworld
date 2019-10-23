import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AuthenticateOutput {
  @Field()
  accessToken: string;
}
