import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { NewUserDto } from "src/user/dtos/new-user.dto";
import { UserResponseDto } from "src/user/dtos/user-response.dto";
import { ExistingUserDto } from "src/user/dtos/existing-user.dto";
import { JwtService } from "@nestjs/jwt";
import { Error } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async register(
    newUser: Readonly<NewUserDto>,
  ): Promise<UserResponseDto | any> {
    const { name, email, password, role } = newUser;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) return "Email Already Taken";
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.createUser(
      name,
      email,
      hashedPassword,
      role,
    );
    const token = this.jwtService.sign({ user });
    return this.userService._generateUserResponse(user, token);
  }
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;
    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;
    return this.userService._generateUserResponse(user);
  }
  async login(existingUser: ExistingUserDto): Promise<{ token: string }> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new BadRequestException("User credentials is wrong", {
        cause: new Error("Error"),
        description: "User credentials are wrong",
      });
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
  verifyJwt(token: string): object {
    return this.jwtService.verify(token);
  }
}
