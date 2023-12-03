import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IBaseDto } from "src/abstraction/interfaces/base-dto.interface";
import { IRepository } from "src/abstraction/repository.interface";
import { IntersectionConfig } from "src/schemas/intersection-config.schema";

@Injectable()
export class TrafficRepository implements IRepository<IntersectionConfig> {
  constructor(
    @InjectModel(IntersectionConfig.name)
    private imageConfigModel: Model<IntersectionConfig>,
  ) { }
  create<D extends IBaseDto>(model: D): Promise<IntersectionConfig> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update<D extends IBaseDto>(model: D): Promise<IntersectionConfig> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<IntersectionConfig> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<IntersectionConfig[]> {
    throw new Error("Method not implemented.");
  }
}
