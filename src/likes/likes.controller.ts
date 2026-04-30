import { Controller, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ConnectedUser } from '../users/_utils/decorator/connected-user.decorator';
import { Protect } from '../auth/_utils/decorator/protect.decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Protect()
  @Post(':categoryId')
  likeAPost(@ConnectedUser() user, @Param('categoryId') catId: string) {
    return this.likesService.likeACategory(catId, user.id);
  }

  @Protect()
  @Get()
  getAllLikes() {
    return this.likesService.getAllLikes();
  }

  @Protect()
  @Post(':likeId')
  deleteLike(@ConnectedUser() user, @Param('likeId') likeId: string) {
    return this.likesService.deleteLike(user.id, likeId);
  }
}
