import { Request, Response } from 'express';
import BookModel from '../services/bookServices';

export const getBooks = async (req: Request, res: Response) => {
  const books = await BookModel.getAllBooks();
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await BookModel.createBook(req.body);
  res.status(201).json(book);
};
