import { Router } from 'express';
import { getBooks, createBook } from './books.controller';
import { validateBook } from './dtos//validateBook';
import { auth } from '../../middleware/authentication';

const router = Router();
router.get('/books', auth, getBooks);
router.post('/book/create', validateBook, auth, createBook);

export default router;
