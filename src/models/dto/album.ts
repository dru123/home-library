import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateRequest } from "../../utils/validate";

export interface AlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export const validateAlbum = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<AlbumDto>({
    name: Joi.string().required(),
    year: Joi.number().integer().required(),
    artistId: Joi.string().uuid().allow(null),
  });

  validateRequest(req, res, next, schema);
};
