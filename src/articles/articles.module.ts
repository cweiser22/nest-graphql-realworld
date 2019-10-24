import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Tag } from './entities/tag.entity';
import { ArticlesResolver } from './articles.resolver';

@Module({
  providers: [ArticlesService, ArticlesResolver],
  imports: [TypeOrmModule.forFeature([Article, Tag])],
})
export class ArticlesModule {}
