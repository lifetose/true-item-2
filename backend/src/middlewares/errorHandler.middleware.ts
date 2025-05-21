import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api-error";

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || "Internal Server Error",
  });
};
