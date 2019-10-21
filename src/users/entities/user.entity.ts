import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  //TODO: setup profile pics with S3 or other service
  image: any;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
