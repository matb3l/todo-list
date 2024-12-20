import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('api/auth', authRoutes);
app.use('api/tasks', taskRoutes);

export default app;