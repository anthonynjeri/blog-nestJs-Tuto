import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConnectedUser } from '../users/decorators/connected-user.decorator';
import { CreateNewCommentDto } from './dto/request/create-new-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateCommentDto } from './dto/request/update-comment.dto';

@Controller({
  path: 'comments',
})
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a comment
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  @ApiBearerAuth()
  create(
    @ConnectedUser() user,
    @Param('postId') id: string,
    @Body() commentDto: CreateNewCommentDto,
  ) {
    return this.commentsService.create(id, user.id, commentDto);
  }

  // Get all comments
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  getComments() {
    return this.commentsService.getAllComments();
  }

  // Get comments by post id
  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  @ApiBearerAuth()
  getCommentsByPostId(@Param('postId') postId: string, @ConnectedUser() user) {
    console.log(user.id);
    return this.commentsService.getCommentsByPostId(postId);
  }

  // Update comments
  @UseGuards(JwtAuthGuard)
  @Patch(':commentId')
  @ApiBearerAuth()
  updateComment(
    @Param('commentId') commentId: string,
    @ConnectedUser() user,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }
}
