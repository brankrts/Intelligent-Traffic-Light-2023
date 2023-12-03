import { Module } from "@nestjs/common";
import { IntersectionController } from "./intersection.controller";
import { IntersectionService } from "./intersection.service";
import { IntersectionRepository } from "./intersection.repository";
import {
  IntersectionConfig,
  IntersectionConfigSchema,
} from "src/schemas/intersection-config.schema";
import {
  Intersection,
  IntersectionSchema,
} from "src/schemas/intersections.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IntersectionConfig.name,
        schema: IntersectionConfigSchema,
      },
      {
        name: Intersection.name,
        schema: IntersectionSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [IntersectionController],
  providers: [IntersectionService, IntersectionRepository],
  exports: [IntersectionRepository],
})
export class IntersectionModule {}
