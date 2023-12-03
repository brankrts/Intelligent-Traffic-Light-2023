import { IsObject, IsString } from "class-validator";
import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";

export default class updateIntersectionDto implements IBaseDto {
  @IsString()
  id: string;

  @IsObject()
  intersectionConfig: Object;
}
