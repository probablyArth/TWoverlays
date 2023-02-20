import { model, Schema } from 'mongoose';

export interface ITask {
  name: string;
  finished: boolean;
  username: string;
  color: string;
}

const TaskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  finished: { type: Boolean, required: true },
  username: { type: String, required: true },
  color: { type: String, required: true },
});

export const TASK_MODEL_NAME = 'Task';
const TaskModel = model<ITask>(TASK_MODEL_NAME, TaskSchema);

export default TaskModel;
