import { Injectable } from "@nestjs/common";
import { IntersectionRepository } from "./intersection.repository";
import { IntersectionConfig } from "src/schemas/intersection-config.schema";
import CreateIntersectionDto from "./dtos/create-intersection.dto";
import { AlreadyExistException } from "src/exceptions/already-exist.exception";
import { Intersection } from "src/schemas/intersections.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CreateAreaDto from "./dtos/create-area.dto";

@Injectable()
export class IntersectionService {
  constructor(
    private readonly intersectionRepository: IntersectionRepository,
    @InjectModel(Intersection.name)
    private readonly intersectionAreaModel: Model<Intersection>,
  ) { }
  async createIntersection(
    intersectionCreateDto: CreateIntersectionDto,
  ): Promise<IntersectionConfig> {
    const isIntersectionExist = await this.intersectionRepository.findOne({
      intersectionSelection: intersectionCreateDto.intersectionSelection,
    });
    if (isIntersectionExist)
      return this.intersectionRepository.findOneAndUpdate(
        {
          intersectionSelection: intersectionCreateDto.intersectionSelection,
        },
        intersectionCreateDto,
      );
    return this.intersectionRepository.create(intersectionCreateDto);
  }
  async getAll(): Promise<IntersectionConfig[]> {
    return this.intersectionRepository.getAll();
  }
  async createIntersectionArea(
    createAreaDto: CreateAreaDto,
  ): Promise<Intersection> {
    const isExist = await this.intersectionAreaModel
      .findOne({
        intersectionName: createAreaDto.intersectionName,
      })
      .exec();
    if (isExist)
      throw new AlreadyExistException(createAreaDto.intersectionName);
    return await this.intersectionAreaModel.create(createAreaDto);
  }
  async getAllIntersectionArea(): Promise<Intersection[]> {
    return await this.intersectionAreaModel.find({});
  }
  async getAreaIntersectionConfig(
    intersectionSelection: string,
  ): Promise<IntersectionConfig> {
    return await this.intersectionRepository.findOne({ intersectionSelection });
  }
}
