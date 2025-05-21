import { model, Schema } from "mongoose";

import { IItem } from "../interfaces/item.interface";

const itemSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Item = model<IItem>("items", itemSchema);
