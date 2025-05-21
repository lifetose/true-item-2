import { ApiError } from "../errors/api-error";
import { IItem } from "../interfaces/item.interface";
import { itemPresenter } from "../presenters/item.presenter";
import { itemRepository } from "../repositories/item.repository";

class ItemService {
  async getAll() {
    const result = await itemRepository.getAll();
    const menuToRes = result.map(itemPresenter.toPublicResDto);
    return menuToRes;
  }

  async getById(id: string) {
    const result = await itemRepository.getById(id);

    if (!result) {
      throw new ApiError("Item not found", 404);
    }

    const menuToRes = itemPresenter.toPublicResDto(result);
    return menuToRes;
  }

  async create(dto: IItem) {
    const result = await itemRepository.create(dto);
    return result;
  }

  async update(id: string, dto: IItem) {
    const result = await itemRepository.update(id, dto);
    return result;
  }

  async deleteById(id: string) {
    return await itemRepository.deleteById(id);
  }
}

export const itemService = new ItemService();
