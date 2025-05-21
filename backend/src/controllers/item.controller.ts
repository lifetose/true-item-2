import { NextFunction, Request, Response } from "express";

import { IItem } from "../interfaces/item.interface";
import { itemService } from "../services/item.service";

class ItemController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await itemService.getAll();
      res.json(items);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const item = await itemService.getById(id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IItem;

      const result = await itemService.create(dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const dto = req.body as IItem;

      const result = await itemService.update(id, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await itemService.deleteById(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const itemController = new ItemController();
