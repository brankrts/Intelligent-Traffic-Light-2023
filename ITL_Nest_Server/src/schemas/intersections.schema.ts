import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Light } from "./light.schema";
import { StaticModeProps } from "./static-mode-selection.schema";
import { BaseEntitiy } from "src/abstraction/interfaces/base-entitiy.abstract";

export type IntersectionDocument = HydratedDocument<Intersection>;

@Schema()
export class Intersection extends BaseEntitiy {
  @Prop({ unique: true })
  intersectionName: string;
}
export const IntersectionSchema = SchemaFactory.createForClass(Intersection);
