import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const authorSchema = Joi.object({
  id: Joi.string().required(),
});

export const validateIndividualAuthorData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = authorSchema.validate(req.params);
  if (error) return res.status(400).json({ message: error.message });
  next();
};
