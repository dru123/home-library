import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateRequest } from "../../utils/validate";

export interface TrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export const validateTrack = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<TrackDto>({
    name: Joi.string().required(),
    artistId: Joi.string().uuid().allow(null),
    albumId: Joi.string().uuid().allow(null),
    duration: Joi.number().integer().required(),
  });

  validateRequest(req, res, next, schema);
};
