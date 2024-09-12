import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const querySchema = Joi.object({
  id: Joi.string().required(),
});

export const deleteBookValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = querySchema.validate(req.params);
  if (error) return res.status(400).json({ message: error.message });
  next();
};
