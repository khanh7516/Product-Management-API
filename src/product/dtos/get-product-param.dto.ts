import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductParam {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;
}
