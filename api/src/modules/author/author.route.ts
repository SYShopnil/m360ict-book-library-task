import { Router } from 'express';
import {
  registerNewAuthor,
  authorLogin,
  loggedInUserHandler,
} from './auth.controller';
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
import { validateIndividualAuthorData } from './dtos/get-individual-author-validator';

const router = Router();
router.get('/authors', auth, getAuthors);
router.get('/authors/:id', validateIndividualAuthorData, auth, getAuthorById);
router.get('/test/author/insert', insertFakeAuthorForTest); //fake api to store 50 authors for test
router.get('/auth/loggedIn/user', auth, loggedInUserHandler);

router.post('/authors', validateAuthor, registerNewAuthor);
router.post('/author/login', validateAuthorLogin, authorLogin);

router.put('/authors/:id', validateAuthorUpdate, auth, updateAuthorById);

router.delete('/authors/:id', auth, deleteAuthorById);

export default router;
