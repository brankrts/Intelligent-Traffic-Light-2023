import { WebSocket } from "ws";
import { Injectable } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from "@nestjs/websockets";
import { Server } from "http";
import { IntersectionConfig } from "src/schemas/intersection-config.schema";
import { SourceTextModule } from "vm";

@WebSocketGateway()
@Injectable()
export class WebsocketGateway
  implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
  afterInit(server: any) {
    console.log("nice job");
  }
  @WebSocketServer() server: Server;
  private connectedSockets: WebSocket[] = [];
  private connectedWithNameSockets: WebSocket[] = [];
  private imageConfigs: IntersectionConfig[] = [];
  private payload = "Hello from server";

  handleConnection(client: any, ...args: any[]) {
    this.connectedSockets.push(client);
  }

  handleDisconnect(client: any) {
    this.connectedSockets = this.connectedSockets.filter(
      (socket) => socket !== client,
    );
    console.log("a client is disconnected");
  }
  @SubscribeMessage("image_config")
  async handleImageConfig(
    @ConnectedSocket() client: any,
    @MessageBody() payload: any,
  ): Promise<void> {
    console.log(JSON.stringify(payload));
    this.payload = payload;
    this.connectedSockets.forEach((socket) => {
      console.log(JSON.stringify(payload));
      socket.send(JSON.stringify(payload));
    });
  }
  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: any,
  ): Promise<void> {
    this.connectedSockets.forEach((socket) => {
      if (socket !== client) {
        socket.send(Buffer.from(data, "base64"));
      }
    });
  }
}
