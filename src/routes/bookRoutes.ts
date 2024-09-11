import { Router } from 'express';
import { getBooks, createBook } from '../controllers/bookController';
import { validateBook } from '../middleware/validateBook';

const router = Router();
router.get('/books', getBooks);
router.post('/books', validateBook, createBook);

export default router;
