import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";

export class ExistingUserDto implements IBaseDto {
  email: string;
  password: string;
}
