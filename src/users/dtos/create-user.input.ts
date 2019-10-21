import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  bio: string;

  @Field()
  password: string;
}
