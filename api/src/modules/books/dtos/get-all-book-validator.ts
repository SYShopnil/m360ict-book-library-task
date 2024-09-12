import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const querySchema = Joi.object({
  page: Joi.string().optional(),
  limit: Joi.string().optional(),
  searchBy: Joi.string().optional(),
  author: Joi.string().optional(),
});

export const allBookListValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = querySchema.validate(req.params);
  if (error) return res.status(400).json({ message: error.message });
  next();
};
