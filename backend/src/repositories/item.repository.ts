import { ApiError } from "../errors/api-error";
import { IItem } from "../interfaces/item.interface";
import { Item } from "../models/item.model";

class ItemRepository {
  public async getAll() {
    return await Item.find();
  }

  public async getById(id: string) {
    return await Item.findById(id);
  }

  public async create(dto: IItem) {
    return await Item.create(dto);
  }

  public async update(id: string, dto: IItem) {
    return await Item.findByIdAndUpdate(id, dto, { new: true });
  }

  public async deleteById(id: string) {
    const result = await Item.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new ApiError("Item not found", 404);
    }
  }
}

export const itemRepository = new ItemRepository();
