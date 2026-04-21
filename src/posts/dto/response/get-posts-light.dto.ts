import { ApiProperty } from '@nestjs/swagger';

export class GetPostsLightDto {
  @ApiProperty({ description: 'Post ID', example: 'ejuhs9883geh75hrye' })
  id: string;
  @ApiProperty({ description: 'Post title', example: 'Welcome to my post' })
  title: string;
  @ApiProperty({ description: 'Post description', example: 'Post desc' })
  description: string;
}
