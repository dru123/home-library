import { validate as uuidValidate } from "uuid";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateUUID(id: string): boolean {
  return uuidValidate(id);
}

export const validateRequest = <T>(
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema<T>
) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  } else {
    req.body = value;
    next();
  }
};
