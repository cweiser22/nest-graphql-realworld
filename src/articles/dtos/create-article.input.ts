import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;

  @Field(type => [String])
  tags: string[];
}
