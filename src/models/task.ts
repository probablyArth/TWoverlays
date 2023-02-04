import { model, Schema } from 'mongoose'

interface ITask {
  name: string
  finished: boolean
  username: string
}

const TaskSchema = new Schema<ITask>({
  name: String,
  finished: Boolean,
  username: { type: String }
})

const TaskModel = model<ITask>('Task', TaskSchema)

export default TaskModel
