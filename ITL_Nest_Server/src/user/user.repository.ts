import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, model } from "mongoose";
import { BaseMongoRepository } from "src/abstraction/database/base-mongo-repository.abstract";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UserRepository extends BaseMongoRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
