import { Router } from 'express';
import { getAuthors, registerNewAuthor } from '../controllers/authorController';
import { validateAuthor } from '../middleware/validateAuthor';

const router = Router();
router.get('/authors', getAuthors);
router.post('/authors', validateAuthor, registerNewAuthor);

export default router;
