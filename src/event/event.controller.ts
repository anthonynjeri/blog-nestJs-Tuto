import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventMapper } from './event.mapper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private eventsMapper: EventMapper,
  ) {}

  @Post(':postId/comment')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  commentOnPost(
    @Request() req,
    @Param('postId') postId: string,
    @Body() comment: CreateCommentDto,
  ) {
    return this.eventService.commentApost(req.user.id, postId, comment);
  }

  @Post(':categoryId/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  likeOnPost(@Request() req, @Param('categoryId') categoryId: string) {
    return this.eventService.likeACategory(req.user.id, categoryId);
  }

  @Get('events')
  getAllEvents() {
    const events = this.eventService.getEvents();

    return events;
  }
}
