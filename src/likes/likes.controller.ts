import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';

import { ApiBearerAuth } from '@nestjs/swagger';
import { ConnectedUser } from '../users/decorators/connected-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':categoryId')
  likeAPost(@ConnectedUser() user, @Param('categoryId') catId: string) {
    return this.likesService.likeACategory(catId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getAllLikes() {
    return this.likesService.getAllLikes();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':likeId')
  deleteLike(@ConnectedUser() user, @Param('likeId') likeId: string) {
    return this.likesService.deleteLike(user.id, likeId);
  }
}
