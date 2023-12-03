import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";

export class NewUserDto implements IBaseDto {
  name: string;
  email: string;
  password: string;
  role: string;
}
