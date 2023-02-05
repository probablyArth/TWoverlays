import TaskModel from '../models/task.js';

export const getAllTasksPopulated = () => {
  return TaskModel.find({}).populate('user');
};
export const getUnfinishedTask = (username: string) => {
  return TaskModel.findOne({ username, finished: false });
};

export const insertTask = async (task: string, username: string) => {
  return await TaskModel.create({ name: task, finished: false, username });
};

export const getTasksCount = async (username: string) => {
  return (await TaskModel.find({ username }).lean()).length;
};

export const getFinishedTasks = (username: string) => {
  return TaskModel.find({ finished: true, username });
};

export const getUserNames = () => {
  return TaskModel.find({}).distinct('username');
};

export const getUsernamesWithTaskCount = () => {
  return TaskModel.aggregate()
    .match({ finished: true })
    .group({
      _id: '$username',
      count: { $sum: 1 },
    });
};
