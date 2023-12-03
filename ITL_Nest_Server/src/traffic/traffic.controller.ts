import { Get, Controller, Post, UseGuards } from "@nestjs/common";
import { TrafficService } from "./traffic.service";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { IntersectionConfig } from "src/schemas/intersection-config.schema";

@Controller("traffic")
export class TrafficController {
  constructor(
    private readonly trafficService: TrafficService,
    private readonly websocketServer: WebsocketGateway,
  ) {}

  @Get("images")
  async addImageConfig(): Promise<IntersectionConfig | null> {
    return null;
  }
}
