import { IItem, IItemResponse } from "./../interfaces/item.interface";

class ItemPresenter {
  public toPublicResDto(entity: IItem): IItemResponse {
    return {
      _id: entity._id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

export const itemPresenter = new ItemPresenter();
