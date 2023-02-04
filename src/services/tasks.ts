import TaskModel from '../models/task.js';

export const getUnfinishedTask = (username: string) => {
  return TaskModel.findOne({ username, finished: false });
};

export const insertTask = async (username: string, task: string) => {
  return await TaskModel.insertMany([{ username, task, finished: false }]);
};

export const getTasksCount = async (username: string) => {
  return (await TaskModel.find({ username }).lean()).length;
};
