import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PointDocument = HydratedDocument<Point>;

@Schema()
export class Point {
  @Prop()
  name: string;
  @Prop()
  x: number;
  @Prop()
  y: number;
}

export const PointSchema = SchemaFactory.createForClass(Point);
