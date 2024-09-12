import { IAuthor } from '../../src/type/entity';

declare global {
  namespace Express {
    interface Request {
      user: IAuthor;
    }
  }
}
