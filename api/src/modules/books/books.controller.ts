import { Request, Response } from 'express';
import BookService from './books.service';
import booksService from './books.service';
import authorService from '../author/author.service';
import { faker } from '@faker-js/faker';
import { IBook } from '../../type/entity';

export const getBooks = async (req: Request, res: Response): Promise<void> => {
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
    if (books && books.length) {
      res.status(202).json({
        message: `${books.length} ${books.length > 1 ? 'books' : 'book'} has found!!`,
        books,
        pagination: {
          page,
          pageSize: limit,
          totalPages,
          totalCount,
        },
      });
    } else {
      res.status(404).json({
        message: `Book Not Found!!`,
        books,
        pagination: {
          page,
          pageSize: limit,
          totalPages,
          totalCount,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving books.' });
  }
};

export const createBook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body = {
      ...req.body,
      author_id: req.user && req.user.id,
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

export const getBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const updateBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const deleteBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const book: number = await booksService.deleteBook(+req.params.id);

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

//For test (insert random book for test)
export const insertDummyBookForTest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { totalCount: totalBook } = await booksService.getBooks({
      page: 1,
      pageSize: 10,
    });
    //check is there have already 50++ book or not
    if (totalBook <= 50) {
      const authors = await authorService.getAllAuthors();

      // check that is there have existing author or not
      if (+authors.total) {
        const newBookList: IBook[] = [];
        for (let authorCount = 0; authorCount < +authors.total; authorCount++) {
          const generateBookAmount =
            Math.floor(Math.random() * (100 - 80 + 1)) + 80; //any number between 80 to 100
          for (
            let bookCount = 1;
            bookCount <= generateBookAmount;
            bookCount++
          ) {
            const authorId = +authors.authors[authorCount]['id']; //get a single author
            const newBook: IBook = {
              author_id: authorId,
              description: faker.lorem.paragraphs(),
              published_date: faker.date.past().toISOString().split('T')[0], // Use a valid past date
              title: faker.lorem.sentence(), // Use faker.sentence() for a valid title
            };
            newBookList.push(newBook);
          }
        }
        const books = await BookService.createMultipleBook(newBookList); //newly added books
        if (!books.length) {
          res.status(500).json({
            message: 'Book Failed To Insert',
            books: null,
            err: null,
          });
        } else {
          res.status(201).json({
            message: `${books.length} book has created!!!`,
            books,
            err: null,
          });
        }
      } else {
        res.status(409).json({
          message:
            'No more book will be add already there have more than 50 books!!!',
          books: null,
          err: null,
        });
      }
    } else {
      res.status(404).json({
        message: 'Already there have 50++ book in the db can not store more',
        books: null,
        err: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Error',
      books: null,
      err: err,
    });
  }
};
