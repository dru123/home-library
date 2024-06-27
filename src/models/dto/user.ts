import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../../utils/validate";

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<CreateUserDto>({
    login: Joi.string().required(),
    password: Joi.string().required(),
  });

  validateRequest(req, res, next, schema);
};

export const validateUpdatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<UpdatePasswordDto>({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });

  validateRequest(req, res, next, schema);
};
