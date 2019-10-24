import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleInput } from './dtos/create-article.input';
import { User } from 'src/users/entities/user.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,
  ) {}

  async create(input: CreateArticleInput, author: User): Promise<Article> {
    let { title, body, description, tags } = input;
    let tagEntities = tags.map(t => new Tag({ slug: t.toString() }));
    let articleData: Partial<Article> = {
      tags: tagEntities,
      title,
      body,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      author,
    };

    const createdArticle = new Article(articleData);
    createdArticle.generateSlug();
    return await this.articlesRepo.save(createdArticle);
  }

  async findOne(slug: string): Promise<Article> {
    return await this.articlesRepo.findOne({ slug });
  }
}
