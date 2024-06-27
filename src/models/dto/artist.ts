import Joi from "joi";
import { validateRequest } from "../../utils/validate";
import { Request, Response, NextFunction } from "express";

export interface ArtistDto {
  id: string;
  name: string;
  grammy: boolean;
}

export const validateArtist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<ArtistDto>({
    name: Joi.string().required(),
    grammy: Joi.boolean().required(),
  });

  validateRequest(req, res, next, schema);
};
