import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Point } from "./point.schema";

export type LightDocument = HydratedDocument<Light>;

@Schema()
export class Light {
  @Prop()
  coords: Point[];
  @Prop()
  name: string;
  @Prop()
  isSetted: boolean;
  @Prop()
  laneCount: number;
}

export const LightSchema = SchemaFactory.createForClass(Light);
