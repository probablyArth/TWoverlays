import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { config } from 'dotenv';

// @ts-expect-error svelte generated frontend
import { handler } from '../build/handler.js';
import taskRouter from './routes/tasks.js';
import authRouter from './routes/auth.js';
config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: `http://localhost:${process.env.PORT}` }));
app.use(express.json());

app.use('/task', taskRouter);
app.use('/overlay', handler);
app.use('/auth', authRouter);

export default app;
