import { Router } from 'express';
import {
  getAllTasksPopulated,
  getUsernamesWithTaskCount,
} from '../services/tasks.js';

const taskRouter = Router();

taskRouter.get('/', async (req, res) => {
  const response = await getAllTasksPopulated();
  return res.json(response);
});

taskRouter.get('/leaderboard', async (req, res) => {
  interface IUsernameWithCount {
    _id: string;
    count: number;
  }
  const response: IUsernameWithCount[] = await getUsernamesWithTaskCount();
  return res.json(response.sort((a, b) => b.count - a.count));
});

export default taskRouter;
