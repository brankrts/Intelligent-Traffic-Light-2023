import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";

export class UserResponseDto implements IBaseDto {
  _id: string;
  name: string;
  email: string;
  token?: string;
  role: string;
}
