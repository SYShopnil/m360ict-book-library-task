import { Request, Response } from 'express';
import AuthorServices from '../services/authorServices';
import { IRegisterAuthor } from '../type/author_type';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authorServices from '../services/authorServices';
import { faker } from '@faker-js/faker';

dotenv.config();

export const getAuthors = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get query parameters for pagination and search
    const page = parseInt(req.query.page as string) || 1; // Default page is 1
    const limit = parseInt(req.query.limit as string) || 2; // Default limit is 2 (can be changed)
    const name = (req.query.name as string) || ''; // Default search term is empty

    // Call the service to get authors with pagination and search
    const { authors, total, totalPages } = await AuthorServices.getAllAuthors(
      page,
      limit,
      name,
    );

    if (authors.length) {
      res.status(200).json({
        message: `${total} author(s) found.`,
        authors,
        currentPage: page,
        totalPages,
        totalResults: total,
        err: null,
      });
    } else {
      res.status(200).json({
        message: 'No authors found!',
        authors: [],
        currentPage: page,
        totalPages,
        totalResults: total,
        err: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      authors: null,
      err: err,
    });
  }
};

export const registerNewAuthor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const body: IRegisterAuthor = {
    birthdate: req.body.birthdate,
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
    bio: req.body?.bio,
  };
  const author = await AuthorServices.createAuthor(body);
  if (author.err) {
    res.status(500).json(author);
  } else {
    res.status(201).json(author);
  }
};

export const authorLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { password, email } = req.body;
    const user = await AuthorServices.getAuthorByEmail(email);
    if (!user) {
      res.status(404).json({
        message: 'User Not Found By Email!!!',
        access_token: null,
        user: null,
        err: null,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(404).json({
        message: 'Password not match!!!',
        access_token: null,
        user: null,
        err: null,
      });
    }

    const payloadDataOfAccessToken = {
      id: user.id,
      email: user.email,
    };
    const accessToken = await jwt.sign(
      payloadDataOfAccessToken,
      process.env.JWT_CODE || 'sdfashdfljasdlfjslfsdf',
    );

    res.status(202).json({
      message: 'Login Successfully!!!!',
      access_token: accessToken,
      user,
      err: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Error',
      access_token: null,
      user: null,
      err: err,
    });
  }
};

export const getAuthorById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const author = await authorServices.getAuthorById(+req.params.id);
    if (!author) {
      res.status(404).json({
        message: 'Author Not Found!!!',
        author: null,
        err: null,
      });
    }
    res.status(202).json({
      message: 'Author Found!!!',
      author: author,
      err: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Error',
      author: null,
      err: err,
    });
  }
};

export const updateAuthorById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updateAuthor = await authorServices.updateAuthorById(
      +req.params.id,
      req.body,
    );
    if (!updateAuthor) {
      res.status(500).json({
        message: 'Author Data Update Failed',
        author: null,
        err: null,
      });
    } else {
      res.status(202).json({
        message: 'Author Data Successfully Updated!!!',
        author: updateAuthor,
        err: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Error',
      author: null,
      err: err,
    });
  }
};

export const deleteAuthorById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Author id is required!!!',
        err: null,
      });
    } else {
      if (req.params.id == req.user.id) {
        res.status(403).json({
          message: 'LoggedIn user can not delete it self',
          err: null,
        });
      } else {
        const deletedAuthor = await authorServices.deleteAuthor(+req.params.id);
        if (!deletedAuthor) {
          res.status(404).json({
            message: 'Delete Failed',
            err: null,
          });
        } else {
          res.status(202).json({
            message: 'Author Deleted Successfully',
            err: null,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal Error',
      err: err,
    });
  }
};

//For test
export const insertFakeAuthorForTest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const authorsToInsert: IRegisterAuthor[] = [];

  for (let i = 0; i < 50; i++) {
    const hashPassword = await bcrypt.hash('author123', 10);
    const authorData: IRegisterAuthor = {
      name: faker.name.firstName(),
      bio: faker.lorem.sentence(),
      birthdate: faker.date.anytime(),
      email: faker.internet.email(),
      password: hashPassword,
    };
    authorsToInsert.push(authorData);
  }

  try {
    const result = await AuthorServices.createMultipleAuthors(authorsToInsert);
    if (result.err) {
      res.status(500).json(result);
    } else {
      res.status(201).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};
