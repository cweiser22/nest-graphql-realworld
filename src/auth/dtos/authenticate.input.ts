import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthenticateInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
