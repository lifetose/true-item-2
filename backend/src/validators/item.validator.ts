import joi from "joi";

export class ItemValidator {
  private static name = joi.string().min(3).max(40).trim();

  public static create = joi.object({
    name: this.name.required(),
  });

  public static update = joi.object({
    name: this.name,
  });
}
