import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model';
import { PostsController } from './posts.controller';
@Module({
  imports: [TypegooseModule.forFeature([PostSchema])],
  controllers: [PostsController]
})
export class PostsModule {}
