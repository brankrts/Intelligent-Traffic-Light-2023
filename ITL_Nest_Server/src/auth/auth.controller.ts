import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { NewUserDto } from "src/user/dtos/new-user.dto";
import { UserResponseDto } from "src/user/dtos/user-response.dto";
import { ExistingUserDto } from "src/user/dtos/existing-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  async register(@Body() user: NewUserDto): Promise<UserResponseDto | any> {
    return await this.authService.register(user);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: ExistingUserDto): Promise<{ token: string }> {
    return await this.authService.login(user);
  }
}
