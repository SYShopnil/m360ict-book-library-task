import { Request, Response } from 'express';
import AuthorModel from '../models/authorModel';

export const getAuthors = async (req: Request, res: Response) => {
  const authors = await AuthorModel.getAllAuthors();
  res.json(authors);
};

export const createAuthor = async (req: Request, res: Response) => {
  const author = await AuthorModel.createAuthor(req.body);
  res.status(201).json(author);
};
