import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const authorSchema = Joi.object({
  name: Joi.string().min(1).required(),
  bio: Joi.string().optional(),
  birthdate: Joi.date().required(),
});

export const validateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { error } = authorSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};
