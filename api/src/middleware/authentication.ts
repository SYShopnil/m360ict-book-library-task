import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import authorService from '../modules/author/author.service';

interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  iat: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_CODE || 'sdfsdf;asdjflsdajflasdf';
    const decoded = jwt.verify(token, secretKey) as CustomJwtPayload;
    const loggedInUser = await authorService.getAuthorById(decoded.id);
    if (loggedInUser) {
      req.user = loggedInUser;
      next();
    } else {
      res.status(404).json({
        message: 'Author Not Found!!',
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
