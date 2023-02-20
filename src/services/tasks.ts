import TaskModel, { ITask } from '../models/task.js';

export const getAllFinishedTasks = () => {
  return TaskModel.find({});
};

export const getAllUnfinishedTasks = () => {
  return TaskModel.find({ finished: false });
};

export const getUnfinishedTask = (username: string) => {
  return TaskModel.findOne({ username, finished: false });
};

export const insertTask = async ({ ...task }: ITask) => {
  return await TaskModel.create({
    name: task.name,
    finished: task.finished,
    username: task.username,
    color: task.color,
  });
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
  return TaskModel.aggregate([
    {
      $group: {
        _id: '$username',
        count: { $sum: 1 },
        color: { $first: '$color' },
      },
    },
  ]);
};
