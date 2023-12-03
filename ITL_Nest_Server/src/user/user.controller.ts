import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/schemas/user.schema";
import { UserResponseDto } from "./dtos/user-response.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param("id") id: string): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }
}
