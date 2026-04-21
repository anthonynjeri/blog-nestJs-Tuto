import { PaginatedQueryDto } from '../../../_utils/dto/requests/paginated-query.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostsPaginatedQueryDto extends PaginatedQueryDto {
  @ApiProperty({ description: 'Search by post title' })
  @IsString()
  @IsOptional()
  search?: string;
}
