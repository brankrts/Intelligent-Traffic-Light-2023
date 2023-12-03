import { IsString } from "class-validator";
import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";
export default class CreateAreaDto implements IBaseDto {
  @IsString()
  intersectionName: string;
}
