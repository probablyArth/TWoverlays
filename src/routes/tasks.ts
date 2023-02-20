import { Router } from 'express';
import { errorHandler } from '../middlewares.js';
import {
  getAllUnfinishedTasks,
  getUsernamesWithTaskCount,
} from '../services/tasks.js';

const taskRouter = Router();

taskRouter.get('/', async (req, res) => {
  try {
    const response = await getAllUnfinishedTasks();
    return res.json(response);
  } catch (e) {
    return errorHandler(e as Error, req, res);
  }
});

taskRouter.get('/leaderboard', async (req, res) => {
  interface IUsernameWithCount {
    _id: string;
    count: number;
    color: string;
  }
  try {
    const response: IUsernameWithCount[] = await getUsernamesWithTaskCount();
    return res.json(response.sort((a, b) => b.count - a.count));
  } catch (e) {
    return errorHandler(e as Error, req, res);
  }
});

export default taskRouter;
