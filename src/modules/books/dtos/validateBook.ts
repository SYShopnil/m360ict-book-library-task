import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().optional(),
  published_date: Joi.date().required(),
});

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};
