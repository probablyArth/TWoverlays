import { Router } from 'express';
import TaskModel from '../models/task.js';

const taskRouter = Router();

taskRouter.get('/', async (req, res) => {
  const response = await TaskModel.find({});
  return res.json(response);
});

export default taskRouter;
