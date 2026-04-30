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
import { ConnectedUser } from '../users/_utils/decorator/connected-user.decorator';
import { CreateNewCommentDto } from './dto/request/create-new-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateCommentDto } from './dto/request/update-comment.dto';
import { Protect } from '../auth/_utils/decorator/protect.decorator';

@Controller({
  path: 'comments',
})
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create a comment
  @Protect()
  @Post(':postId')
  create(
    @ConnectedUser() user,
    @Param('postId') id: string,
    @Body() commentDto: CreateNewCommentDto,
  ) {
    return this.commentsService.create(id, user.id, commentDto);
  }

  // Get all comments
  @Protect()
  @Get()
  getComments() {
    return this.commentsService.getAllComments();
  }

  // Get comments by post id
  @Protect()
  @Get(':postId')
  getCommentsByPostId(@Param('postId') postId: string, @ConnectedUser() user) {
    console.log(user.id);
    return this.commentsService.getCommentsByPostId(postId);
  }

  // Update comments
  @Protect()
  @Patch(':commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @ConnectedUser() user,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }
}
