import { IsArray, IsObject, IsString } from "class-validator";
import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";
export default class CreateIntersectionDto implements IBaseDto {
  @IsString()
  modeSelection: string;
  @IsString()
  intersectionSelection: string;
  @IsArray()
  lights: Array<Object>;
  staticModeProbs?: Object;
}
