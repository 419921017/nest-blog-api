import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Post as PostSchema } from './post.model';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: '帖子标题1' })
  @IsNotEmpty({ message: '请填写标题' })
  title: string;
  @ApiProperty({ description: '帖子内容', example: '帖子内容1' })
  content: string;
}

// tslint:disable-next-line: max-classes-per-file
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(@InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>) {}


  @Get()
  @ApiOperation({ summary: '显示博客列表', description: '显示博客列表' })
  async index() {
    return await this.postModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Query() query,
    @Param() params,
  ) {
    await this.postModel.create(createPostDto);
    return { success: true };
  }

  @Post(':id')
  @ApiOperation({ summary: '显示详情' })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await this.postModel.findByIdAndUpdate(id, updatePostDto);
    return { success: true };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id);
    return { success: true };
  }
}
