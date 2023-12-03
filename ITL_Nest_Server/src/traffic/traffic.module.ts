import { Module } from "@nestjs/common";
import { TrafficService } from "./traffic.service";
import { TrafficController } from "./traffic.controller";
import { TrafficRepository } from "./traffic.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import {
  IntersectionConfig,
  IntersectionConfigSchema,
} from "src/schemas/intersection-config.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IntersectionConfig.name,
        schema: IntersectionConfigSchema,
      },
    ]),
  ],
  providers: [TrafficService, TrafficRepository, WebsocketGateway],
  controllers: [TrafficController],
})
export class TrafficModule {}
