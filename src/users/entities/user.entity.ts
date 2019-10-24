import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  bio: string;

  @Column()
  password: string;

  @OneToMany(type => Article, article => article.author)
  articles: Article[];

  //TODO: setup profile pics with S3 or other service
  image: any;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
