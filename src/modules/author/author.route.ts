import { Router } from 'express';
import { registerNewAuthor, authorLogin } from './auth.controller';
import {
  getAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
  insertFakeAuthorForTest,
} from './author.controller';
import { validateAuthor } from './dtos/validateAuthor';
import { validateAuthorLogin } from './dtos/validateLogin';
import { auth } from '../../middleware/authentication';
import { validateAuthorUpdate } from './dtos/author-update';

const router = Router();
router.get('/authors', auth, getAuthors);
router.get('/author/:id', auth, getAuthorById);
router.get('/test/author/insert', insertFakeAuthorForTest); //fake api to store 50 authors for test

router.post('/author/register', validateAuthor, registerNewAuthor);
router.post('/author/login', validateAuthorLogin, authorLogin);

router.put('/author/update/:id', validateAuthorUpdate, auth, updateAuthorById);

router.delete('/author/delete/:id', auth, deleteAuthorById);

export default router;
