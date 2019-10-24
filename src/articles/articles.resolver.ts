import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import {
  NotFoundException,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CreateArticleInput } from './dtos/create-article.input';
import { GqlJwtGuard } from '../gql-jwt.guard';

@Resolver('Articles')
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Query(returns => Article)
  async article(@Args('slug') slug: string): Promise<Article> {
    const articleRecord = await this.articlesService.findOne(slug);
    if (!articleRecord) {
      throw new NotFoundException();
    }
    return articleRecord;
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(returns => Article)
  async createArticle(
    @Context() ctx,
    @Args('input') input: CreateArticleInput,
  ): Promise<Article> {
    console.log(ctx.req.user);
    try {
      return await this.articlesService.create(input, ctx.req.user);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Failed to post article.');
    }
  }
}
