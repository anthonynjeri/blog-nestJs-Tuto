import { Injectable } from '@nestjs/common';

import { EventRepository } from './event.repository';
import { EventMapper } from './event.mapper';
import { CreateCommentDto } from './dto/request/create-comment.dto';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private eventsMapper: EventMapper,
  ) {}

  async getEvents() {
    const events = await this.eventRepository.getAllEvents();
    return this.eventsMapper.toGetEventDto(events);
  }

  async likeACategory(authorId: string, categoryId: string) {
    return this.eventRepository.likePost(authorId, categoryId);
  }

  async commentApost(
    authorId: string,
    postId: string,
    commentDto: CreateCommentDto,
  ) {
    return this.eventRepository.commentPost(authorId, postId, commentDto);
  }
}
