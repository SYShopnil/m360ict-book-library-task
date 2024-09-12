import { Request, Response } from 'express';
import BookService from './books.service';
import booksService from './books.service';

export const getBooks = async (req: Request, res: Response) => {
  try {
    // Extract query parameters for pagination and filtering
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const searchBy = req.query.searchBy as string | undefined;
    const authorId = req.query.author as string | undefined;

    const { books, totalCount } = await BookService.getBooks({
      page,
      pageSize: limit,
      title: searchBy,
      author: authorId,
    });

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      books,
      pagination: {
        page,
        pageSize: limit,
        totalPages,
        totalCount,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving books.' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const body = {
      ...req.body,
      author_id: req.user.id,
    };
    const book = await BookService.createBook(body);
    if (!book) {
      res.status(500).json({
        message: 'Book Insert Failed',
        err: null,
        book: null,
      });
    } else {
      res.status(201).json({
        message: 'Book Insert Successfully',
        err: null,
        book: book,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Some internal error',
      err: err,
      book: null,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await booksService.getBookById(+req.params.id);
    if (!book) {
      res.status(404).json({
        message: 'Book not found!!',
        err: null,
        book: null,
      });
    } else {
      res.status(202).json({
        message: `Book Found!!`,
        err: null,
        book,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Some internal error',
      err: err,
      book: null,
    });
  }
};

export const updateBookById = async (req: Request, res: Response) => {
  try {
    const book = await booksService.updateBook(+req.params.id, req.body);

    if (!book) {
      res.status(404).json({
        message: 'Book not found!!',
        err: null,
        book: null,
      });
    } else {
      res.status(202).json({
        message: `Book Successfully Updated!!`,
        err: null,
        book,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Some internal error',
      err: err,
      book: null,
    });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const book = await booksService.deleteBook(+req.params.id);

    if (!book) {
      res.status(404).json({
        message: 'Book Delete Failed or Book not found!!',
        err: null,
      });
    } else {
      res.status(202).json({
        message: `Book Successfully Deleted!!`,
        err: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Some internal error',
      err: err,
    });
  }
};
