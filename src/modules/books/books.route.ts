import { Router } from 'express';
import {
  getBooks,
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
} from './books.controller';
import { validateBook } from './dtos//validateBook';
import { auth } from '../../middleware/authentication';
import { updateBookValidator } from './dtos/updateBook';
import { deleteBookValidator } from './dtos/deleteBookValidator';

const router = Router();
router.get('/books', auth, getBooks);
router.get('/book/:id', auth, getBookById);
router.post('/book/create', validateBook, auth, createBook);
router.put('/book/update/:id', updateBookValidator, auth, updateBookById);
router.delete('/book/delete/:id', deleteBookValidator, auth, deleteBookById);

export default router;
