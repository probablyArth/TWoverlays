import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { config } from 'dotenv';
config();
import * as middlewares from './middlewares.js';


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
