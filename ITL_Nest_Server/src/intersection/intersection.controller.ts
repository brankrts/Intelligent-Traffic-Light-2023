import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IntersectionService } from "./intersection.service";
import CreateIntersectionDto from "./dtos/create-intersection.dto";
import { IntersectionConfig } from "src/schemas/intersection-config.schema";
import { AuthGuard } from "src/auth/guards/jwt.guard";
import { RoleGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/auth/guards/roles.decorator";
import { RolesEnum } from "src/auth/guards/roles.enum";
import { Intersection } from "src/schemas/intersections.schema";
import CreateAreaDto from "./dtos/create-area.dto";

@Controller("intersection")
export class IntersectionController {
  constructor(private readonly intersectionService: IntersectionService) { }
  // @Get(":id")
  // async getIntersection(
  //   @Param("id") id: string,
  // ): Promise<IntersectionConfig[]> {
  //   return this.intersectionService.getAll();
  // }
  //
  // @Roles(RolesEnum.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  @Post("create-config")
  async createIntersection(
    @Body() createIntersectionDto: CreateIntersectionDto,
  ): Promise<IntersectionConfig> {
    return this.intersectionService.createIntersection(createIntersectionDto);
  }

  // @Roles(RolesEnum.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  @Post("create-area")
  async createIntersectionArea(
    @Body() createAreDto: CreateAreaDto,
  ): Promise<Intersection> {
    return await this.intersectionService.createIntersectionArea(createAreDto);
  }

  @Get("areas")
  async getAllIntersectionAreas(): Promise<Intersection[]> {
    return await this.intersectionService.getAllIntersectionArea();
  }

  @Get("configs")
  async getAllIntersection(): Promise<IntersectionConfig[]> {
    return this.intersectionService.getAll();
  }
  @Get("configs/:intersectionSelection")
  async getAreaConfig(
    @Param("intersectionSelection") intersectionSelection: string,
  ): Promise<IntersectionConfig> {
    return await this.intersectionService.getAreaIntersectionConfig(
      intersectionSelection,
    );
  }
}
