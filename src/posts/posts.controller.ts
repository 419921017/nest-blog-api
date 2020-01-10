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
import { PostModel } from './post.model';
import { IsNotEmpty } from 'class-validator';

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
  @Get()
  @ApiOperation({ summary: '显示博客列表', description: '显示博客列表' })
  async index() {
    return await PostModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Query() query,
    @Param() params,
  ) {
    await PostModel.create(createPostDto);
    return { success: true };
  }

  @Post(':id')
  @ApiOperation({ summary: '显示详情' })
  async detail(@Param('id') id: string) {
    return await PostModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await PostModel.findByIdAndUpdate(id, updatePostDto);
    return { success: true };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await PostModel.findByIdAndDelete(id);
    return { success: true };
  }
}
