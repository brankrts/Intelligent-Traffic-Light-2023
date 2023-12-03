import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/schemas/user.schema";
import { UserResponseDto } from "./dtos/user-response.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }
  async createUser(
    name: string,
    email: string,
    hashedPassword: string,
    role: string,
  ): Promise<UserDocument> {
    return await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  _generateUserResponse(user: UserDocument, token?: string): UserResponseDto {
    if (!token)
      return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      };

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userRepository.findOne({ email });
  }
  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return this._generateUserResponse(user);
  }
}
