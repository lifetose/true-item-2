import { Router } from "express";

import { itemController } from "../controllers/item.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ItemValidator } from "../validators/item.validator";

const router = Router();

router.get("/", itemController.getAll);

router.post(
  "/",
  commonMiddleware.isBodyValid(ItemValidator.create),
  itemController.create,
);
router.get("/:id", itemController.getById);
router.put(
  "/:id",
  commonMiddleware.isBodyValid(ItemValidator.update),
  itemController.update,
);
router.delete("/:id", itemController.deleteById);

export const itemRouter = router;
