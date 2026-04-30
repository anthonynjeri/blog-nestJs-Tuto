import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { EventService } from './event.service';
import { EventMapper } from './event.mapper';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CommentEventDto } from './dto/response/comment-event.dto';
import { LikeEventDto } from './dto/response/like-event.dto';
import { Protect } from '../auth/_utils/decorator/protect.decorator';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private eventsMapper: EventMapper,
  ) {}

  @Protect()
  @Post(':postId/comment')
  commentOnPost(
    @Request() req,
    @Param('postId') postId: string,
    @Body() comment: CreateCommentDto,
  ) {
    return this.eventService.commentApost(req.user.id, postId, comment);
  }

  @Protect()
  @Post(':categoryId/like')
  likeOnPost(@Request() req, @Param('categoryId') categoryId: string) {
    return this.eventService.likeACategory(req.user.id, categoryId);
  }

  @ApiExtraModels(CommentEventDto, LikeEventDto)
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        oneOf: [
          {
            $ref: getSchemaPath(CommentEventDto),
          },
          {
            $ref: getSchemaPath(LikeEventDto),
          },
        ],
      },
    },
  })
  @Get('events')
  getAllEvents() {
    const events = this.eventService.getEvents();

    return events;
  }
}
