import { Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  return res.status(400).json({ message: err.message });
};