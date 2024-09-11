import { Router } from 'express';
import { getAuthors, createAuthor } from '../controllers/authorController';
import { validateAuthor } from '../middleware/validateAuthor';

const router = Router();
router.get('/authors', getAuthors);
router.post('/authors', validateAuthor, createAuthor);

export default router;
