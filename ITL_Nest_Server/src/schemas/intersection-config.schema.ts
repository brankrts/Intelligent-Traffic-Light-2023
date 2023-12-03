import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Light } from "./light.schema";
import { StaticModeProps } from "./static-mode-selection.schema";
import { BaseEntitiy } from "src/abstraction/interfaces/base-entitiy.abstract";

export type IntersectionConfigDocument = HydratedDocument<IntersectionConfig>;

@Schema()
export class IntersectionConfig extends BaseEntitiy {
  @Prop()
  lights: Light[];
  @Prop()
  modeSelection: string;
  @Prop()
  staticModeProbs: StaticModeProps;
  @Prop({ unique: true })
  intersectionSelection: string;
}

export const IntersectionConfigSchema =
  SchemaFactory.createForClass(IntersectionConfig);
