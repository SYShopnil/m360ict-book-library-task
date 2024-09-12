import express, { Request, Response } from 'express';
import authorRoutes from './modules/author/author.route';
import bookRoutes from './modules/books/books.route';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));
app.use(cors());

app.use('/api/v1', authorRoutes);
app.use('/api/v1', bookRoutes);

app.use('/api/v1', (req: Request, res: Response) => {
  res.status(202).json({
    message: 'Server is Up....',
  });
});

app.use(errorHandler);

export default app;
