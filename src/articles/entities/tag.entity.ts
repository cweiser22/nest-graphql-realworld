import { ObjectType, Field } from 'type-graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { Article } from './article.entity';

@ObjectType()
@Entity()
export class Tag {
  @Field()
  @PrimaryColumn()
  slug: string;

  @Field(type => [Article])
  @ManyToMany(type => Article, article => article.tags)
  articles: Article[];

  constructor(init?: Partial<Tag>) {
    Object.assign(this, init);
  }
}
