import { PaginatedQueryDto } from '../../../_utils/dto/requests/paginated-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CategoryPaginatedQueryDto extends PaginatedQueryDto {
  @ApiProperty({ description: 'Search by category title' })
  @IsString()
  @IsOptional()
  search?: string;
}
