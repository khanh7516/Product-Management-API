import { IsInt, Min } from 'class-validator';

export class GetProductParam {
  @IsInt()
  @Min(1)
  id: number;
}
