import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import { IntersectionConfigDocument } from "src/schemas/intersection-config.schema";

export abstract class BaseMongoRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) { }
  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T> {
    return await this.entityModel
      .findOne(entityFilterQuery, { ...projection })
      .exec();
  }
  async getAll(): Promise<IntersectionConfigDocument[]> {
    return await this.entityModel.find({});
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | any> {
    return await this.entityModel
      .find(entityFilterQuery, { ...projection })
      .exec();
  }
  async findById(id: string): Promise<T | any> {
    return await this.entityModel.findById(id).exec();
  }

  async create(createEntityData: unknown): Promise<T | any> {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  }
  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }
  async delete(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deletedItem = await this.entityModel.deleteOne(entityFilterQuery);
    if (deletedItem.deletedCount > 0) return true;
    return false;
  }
}
