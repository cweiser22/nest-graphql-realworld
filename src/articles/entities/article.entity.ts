import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tag } from './tag.entity';

@ObjectType()
@Entity()
export class Article {
  @Field()
  @PrimaryColumn()
  slug: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  //TODO: tag entity
  @Field(type => [Tag])
  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];

  @Field()
  @Column()
  body: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

  @Field(type => User)
  @ManyToOne(type => User, user => user.articles)
  author: User;

  generateSlug() {
    let slugText = this.title;
    //TODO: make multiple spaces in a row be replaced by only one hyphen
    slugText = slugText.toLowerCase().replace(' ', '-');
    this.slug = slugText;
  }

  constructor(init?: Partial<Article>) {
    Object.assign(this, init);
  }
}
