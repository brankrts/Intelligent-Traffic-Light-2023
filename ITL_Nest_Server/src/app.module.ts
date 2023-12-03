import { Module } from "@nestjs/common";
import { WebsocketModule } from "./websocket/websocket.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TrafficModule } from "./traffic/traffic.module";
import { IntersectionController } from "./intersection/intersection.controller";
import { IntersectionService } from "./intersection/intersection.service";
import { IntersectionModule } from "./intersection/intersection.module";
import {
  IntersectionConfig,
  IntersectionConfigSchema,
} from "./schemas/intersection-config.schema";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import {
  Intersection,
  IntersectionSchema,
} from "./schemas/intersections.schema";
@Module({
  imports: [
    WebsocketModule,
    MongooseModule.forRoot("mongodb://localhost:27017/traffic_lights"),
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
    TrafficModule,
    IntersectionModule,
    UserModule,
    AuthModule,
  ],

  controllers: [IntersectionController],
  providers: [IntersectionService],
})
export class AppModule {}
