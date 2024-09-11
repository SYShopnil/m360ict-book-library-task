import express from 'express';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());

app.use('/api', authorRoutes);
app.use('/api', bookRoutes);

app.use(errorHandler);

export default app;
