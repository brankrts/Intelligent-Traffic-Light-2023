import { Get, Injectable } from "@nestjs/common";
import { TrafficRepository } from "./traffic.repository";

@Injectable()
export class TrafficService {
  constructor(private readonly trafficRepository: TrafficRepository) {}

  @Get()
  sayHello() {
    return "Hello";
  }
}
