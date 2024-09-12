import { Router } from 'express';
import {
  getAuthors,
  registerNewAuthor,
  authorLogin,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
} from '../controllers/authorController';
import { validateAuthor } from '../middleware/validateAuthor';
import { validateAuthorLogin } from '../middleware/validateLogin';
import { auth } from '../middleware/authentication';
import { validateAuthorUpdate } from '../middleware/author-update';

const router = Router();
router.get('/authors', auth, getAuthors);
router.get('/author/:id', auth, getAuthorById);

router.post('/author/register', validateAuthor, registerNewAuthor);
router.post('/author/login', validateAuthorLogin, authorLogin);

router.put('/author/update/:id', auth, updateAuthorById);

router.delete(
  '/author/delete/:id',
  validateAuthorUpdate,
  auth,
  deleteAuthorById,
);

export default router;
