import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseMongoRepository } from "src/abstraction/database/base-mongo-repository.abstract";

import {
  IntersectionConfig,
  IntersectionConfigDocument,
} from "src/schemas/intersection-config.schema";

@Injectable()
export class IntersectionRepository extends BaseMongoRepository<IntersectionConfigDocument> {
  constructor(
    @InjectModel(IntersectionConfig.name)
    private readonly intersectionModel: Model<IntersectionConfigDocument>,
  ) {
    super(intersectionModel);
  }
}
