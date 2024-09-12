import { Router } from 'express';
import {
  getBooks,
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
  insertDummyBookForTest,
} from './books.controller';
import { validateBookInsertion } from './dtos//validateBook';
import { auth } from '../../middleware/authentication';
import { updateBookValidator } from './dtos/updateBook';
import { deleteBookValidator } from './dtos/deleteBookValidator';
import { bookListFilterByAuthorIdValidator } from './dtos/bookListByAuthorIdValidator';
import { allBookListValidator } from './dtos/get-all-book-validator';
import { validateIndividualBookData } from './dtos/get-individual-book-validator';

const router = Router();
router.get('/books', allBookListValidator, auth, getBooks);
router.get('/books/:id', validateIndividualBookData, auth, getBookById);
router.get('/test/book/insert', insertDummyBookForTest); //this will insert plenty of books based on available author

router.post('/books', validateBookInsertion, auth, createBook);
router.put('/books/:id', updateBookValidator, auth, updateBookById);
router.delete('/books/:id', deleteBookValidator, auth, deleteBookById);

export default router;
