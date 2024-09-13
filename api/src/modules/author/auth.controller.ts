import { Request, Response } from 'express';
import AuthorServices from './author.service';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IRegisterAuthor } from '../../type/author_type';
import {
  IAuthorLoginBOdy,
  IPayloadDataOfAccessToken,
} from './types/author.type.auth.controller';

dotenv.config();

export const registerNewAuthor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
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
    const { password, email }: IAuthorLoginBOdy = req.body;
    const user = await AuthorServices.getAuthorByEmail(email);
    if (!user) {
      res.status(404).json({
        message: 'User Not Found By Email!!!',
        access_token: null,
        user: null,
        err: null,
      });
    } else {
      const userPassword: string = (user && user.password) || '';
      const isPasswordMatch = await bcrypt.compare(password, userPassword);
      if (!isPasswordMatch) {
        res.status(404).json({
          message: 'Password not match!!!',
          access_token: null,
          user: null,
          err: null,
        });
      } else {
        const payloadDataOfAccessToken: IPayloadDataOfAccessToken = {
          id: user ? user.id : NaN,
          email: user ? user.email : '',
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
      }
    }
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

export const loggedInUserHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const loggedInUser = req.user;
    if (loggedInUser) {
      res.status(202).json({
        message: `Hello ${loggedInUser.name}!!!`,
        user: loggedInUser,
        err: null,
      });
    } else {
      res.status(404).json({
        message: 'No user is loggedIn',
        user: null,
        err: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Error',
      user: null,
      err: err,
    });
  }
};
