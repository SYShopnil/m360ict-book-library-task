import { Request, Response } from 'express';
import AuthorServices from './author.service';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IRegisterAuthor } from '../../type/author_type';

dotenv.config();

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
