import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StaticModeSelectionDocument = HydratedDocument<StaticModeProps>;

@Schema()
export class StaticModeProps {
  @Prop()
  redLight: number;
  @Prop()
  greenLight: number;
  @Prop()
  yellowLight: number;
}

export const StaticModeSelectionSchema =
  SchemaFactory.createForClass(StaticModeProps);
