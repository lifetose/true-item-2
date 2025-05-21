import { PickRequired } from "../types/pick-required.type";

export interface IItem {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IItemResponse = Pick<IItem, "name"> &
  PickRequired<IItem, "_id" | "createdAt" | "updatedAt">;
